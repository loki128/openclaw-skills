"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChefHat,
  Globe,
  Users,
  FlaskConical,
  ArrowRight,
  Star,
  MapPin,
  Clock
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const products = [
  {
    name: "Basbousa Brownies",
    origin: "Egypt",
    description: "Semolina-brownie fusion soaked in rose syrup",
    price: "$24",
    serves: "Serves 8-10",
    tags: ["Signature", "Fudge"],
    color: "from-amber-600 to-yellow-500"
  },
  {
    name: "Baklava Crunch Cookies",
    origin: "Greece",
    description: "Walnut-honey cookies with phyllo crumble",
    price: "$18",
    serves: "Dozen",
    tags: ["Nutty", "Crisp"],
    color: "from-amber-700 to-amber-500"
  },
  {
    name: "Turkish Delight Brownies",
    origin: "Turkey",
    description: "Pistachio-rose water fudge brownies",
    price: "$26",
    serves: "Serves 8-10",
    tags: ["Floral", "Dense"],
    color: "from-pink-600 to-rose-400"
  },
  {
    name: "Engineer's Chocolate Cake",
    origin: "USA",
    description: "Triple-layer precision chocolate cake",
    price: "$45",
    serves: "Serves 12-16",
    tags: ["Celebration", "Classic"],
    color: "from-neutral-700 to-neutral-500"
  },
  {
    name: "Tahini Shortbread",
    origin: "Turkey",
    description: "Sesame-forward crisp cookies",
    price: "$16",
    serves: "Dozen",
    tags: ["Unique", "Buttery"],
    color: "from-yellow-600 to-amber-400"
  },
  {
    name: "Galaktoboureko Cake",
    origin: "Greece",
    description: "Custard-filled semolina celebration cake",
    price: "$42",
    serves: "Serves 10-12",
    tags: ["Custard", "Citrus"],
    color: "from-orange-400 to-yellow-300"
  }
];

const stats = [
  { icon: Globe, label: "3 Continents", value: "Global Recipes" },
  { icon: FlaskConical, label: "Engineer", value: "Precision Baked" },
  { icon: Users, label: "Family-Size", value: "Feed the Crowd" },
  { icon: Clock, label: "Years", value: "Of Experience" }
];

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-md"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <ChefHat className="h-8 w-8 text-amber-600" />
            <span className="text-xl font-bold text-neutral-900">Cleopatra Delights</span>
          </div>
          <div className="hidden items-center gap-6 text-sm font-medium text-neutral-600 md:flex">
            <a href="#menu" className="hover:text-amber-600 transition-colors">Menu</a>
            <a href="#story" className="hover:text-amber-600 transition-colors">Our Story</a>
            <a href="#order" className="hover:text-amber-600 transition-colors">Order</a>
          </div>
          <Button className="bg-amber-600 hover:bg-amber-700">
            Order Now
          </Button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen pt-20">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-amber-50 via-neutral-50 to-amber-100"
          style={{ opacity: heroOpacity, scale: heroScale }}
        />

        <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col items-center justify-center px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-800"
          >
            <MapPin className="h-4 w-4" />
            Jacksonville, FL
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6 text-5xl font-bold tracking-tight text-neutral-900 md:text-7xl"
          >
            Engineered for
            <br />
            <span className="bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent">Delight</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-8 max-w-2xl text-lg text-neutral-600 md:text-xl"
          >
            An African engineer's precision meets three continents of flavor.
            Family-size brownies, cookies, and cakes - perfected across Egypt, Greece, and Turkey.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 px-8">
              View Menu <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-neutral-300">
              Our Story
            </Button>
          </motion.div>

          {/* Floating Stats */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="flex flex-col items-center rounded-2xl bg-white/60 p-4 backdrop-blur-sm"
              >
                <stat.icon className="mb-2 h-6 w-6 text-amber-600" />
                <span className="text-sm font-medium text-neutral-900">{stat.value}</span>
                <span className="text-xs text-neutral-500">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section id="menu" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <Badge className="mb-4 bg-amber-100 text-amber-800 hover:bg-amber-100">
              Family-Size Portions
            </Badge>
            <h2 className="mb-4 text-4xl font-bold text-neutral-900">
              The Menu
            </h2>
            <p className="mx-auto max-w-2xl text-neutral-600">
              Every recipe traveled across continents before reaching your table.
              Engineered for the perfect texture, baked for the whole family.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {products.map((product) => (
              <motion.div key={product.name} variants={fadeInUp}>
                <Card className="group h-full overflow-hidden border-neutral-200 transition-all hover:shadow-xl">
                  <div className={`h-2 bg-gradient-to-r ${product.color}`} />
                  <CardContent className="p-6">
                    <div className="mb-3 flex items-start justify-between">
                      <div>
                        <p className="text-xs font-medium text-amber-600">{product.origin}</p>
                        <h3 className="text-lg font-bold text-neutral-900">{product.name}</h3>
                      </div>
                      <span className="text-lg font-bold text-neutral-900">{product.price}</span>
                    </div>

                    <p className="mb-4 text-sm text-neutral-600">{product.description}</p>

                    <div className="mb-4 flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-neutral-500">{product.serves}</span>
                      <Button size="sm" variant="ghost" className="text-amber-600 hover:text-amber-700">
                        Add to Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="bg-neutral-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-amber-600 text-white">Our Story</Badge>
              <h2 className="mb-6 text-4xl font-bold">
                From Engineering to
                <br />
                <span className="text-amber-400">Kneading</span>
              </h2>
              <div className="space-y-4 text-neutral-300">
                <p>
                  I'm an engineer by training, a baker by passion. For years, I cooked for
                  my whole family across three continents - Africa, Asia, and North America.
                </p>
                <p>
                  Every dessert I make combines the precision of engineering with recipes
                  passed down through generations. From Egyptian basbousa to Greek baklava
                  to Turkish delight - each one perfected through countless test batches.
                </p>
                <p>
                  Now in Jacksonville, I bake family-size portions because desserts
                  are meant to be shared. No tiny portions. No shortcuts. Just authentic,
                  engineered delight.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid gap-4"
            >
              {[
                { country: "Egypt", specialty: "Basbousa & Rose Desserts", icon: "🇪🇬" },
                { country: "Greece", specialty: "Baklava & Honey Pastries", icon: "🇬🇷" },
                { country: "Turkey", specialty: "Turkish Delight & Tahini", icon: "🇹🇷" },
                { country: "USA", specialty: "Engineered Classics", icon: "🇺🇸" }
              ].map((item) => (
                <motion.div
                  key={item.country}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4 rounded-xl bg-neutral-800 p-4"
                >
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <p className="font-semibold">{item.country}</p>
                    <p className="text-sm text-neutral-400">{item.specialty}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-amber-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="mb-8 flex justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-6 w-6 fill-amber-400 text-amber-400" />
              ))}
            </div>

            <blockquote className="mx-auto mb-8 max-w-3xl text-2xl font-medium text-neutral-900">
              "The basbousa brownies disappeared in minutes at our family reunion.
              Perfect texture, not too sweet, and the rose syrup was incredible."
            </blockquote>

            <p className="text-neutral-600">- Sarah M., Jacksonville</p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="order" className="py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-4xl font-bold text-neutral-900">
              Ready to taste the world?
            </h2>
            <p className="mb-8 text-lg text-neutral-600">
              Family-size portions, engineered to perfection.
              Delivered fresh in Jacksonville.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700 px-8 py-6 text-lg">
                Place Your Order
              </Button>
            </motion.div>

            <p className="mt-4 text-sm text-neutral-500">
              Questions? Call or text: (904) XXX-XXXX
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <ChefHat className="h-6 w-6 text-amber-600" />
              <span className="font-bold text-neutral-900">Cleopatra Delights</span>
            </div>

            <p className="text-sm text-neutral-500">
              © 2024 Cleopatra Delights. An engineer's passion, a family's recipes.
            </p>

            <div className="flex gap-4 text-sm text-neutral-600">
              <a href="#" className="hover:text-amber-600">Instagram</a>
              <a href="#" className="hover:text-amber-600">Facebook</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
