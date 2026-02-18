'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ChefHat, Globe, Sparkles, ArrowRight, Star, MapPin, Clock, Instagram, Mail } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
};

const products = [
  {
    name: "Midnight Brownies",
    origin: "Egyptian Fusion",
    description: "Dark chocolate semolina brownies with rose water glaze",
    price: "$28",
    serves: "Serves 8-10",
    image: "https://i.ibb.co/0yy36qCQ/Chat-GPT-Image-Feb-17-2026-09-57-55-PM.png",
    tags: ["Signature", "Dark Chocolate"]
  },
  {
    name: "Golden Baklava Bites",
    origin: "Greek Heritage",
    description: "Honey-drenched walnut pastries with phyllo layers",
    price: "$24",
    serves: "Dozen",
    image: "https://i.ibb.co/5xLPmmM6/Chat-GPT-Image-Feb-17-2026-09-58-03-PM.png",
    tags: ["Nutty", "Honey"]
  },
  {
    name: "Royal Pistachio Delight",
    origin: "Turkish Inspired",
    description: "Pistachio-rose brownies with edible gold leaf",
    price: "$32",
    serves: "Serves 8-10",
    image: "https://i.ibb.co/1tG9YyR4/Chat-GPT-Image-Feb-17-2026-09-58-09-PM.png",
    tags: ["Luxury", "Pistachio"]
  },
  {
    name: "Midnight Velvet Cake",
    origin: "Engineer's Masterpiece",
    description: "Triple-layer navy velvet with gold accents",
    price: "$58",
    serves: "Serves 12-16",
    image: "https://i.ibb.co/5xYNP5vw/Chat-GPT-Image-Feb-17-2026-09-58-15-PM.png",
    tags: ["Celebration", "Velvet"]
  },
  {
    name: "Sapphire Shortbread",
    origin: "Mediterranean Fusion",
    description: "Buttery lavender-blue cookies with pearl sugar",
    price: "$22",
    serves: "Dozen",
    image: "https://i.ibb.co/YFBHXmXR/Chat-GPT-Image-Feb-17-2026-09-58-35-PM.png",
    tags: ["Unique", "Buttery"]
  },
  {
    name: "Imperial Custard Cake",
    origin: "Greek-Turkish Fusion",
    description: "Semolina custard cake with citrus and gold",
    price: "$52",
    serves: "Serves 10-12",
    image: "https://i.ibb.co/fzDNPpDT/Chat-GPT-Image-Feb-17-2026-09-59-04-PM.png",
    tags: ["Custard", "Citrus"]
  }
];

const galleryImages = [
  "https://i.ibb.co/q34ZWfvb/Chat-GPT-Image-Feb-17-2026-09-59-13-PM.png",
  "https://i.ibb.co/fzZhfjRn/Toasty-s-mores-brownies-with-chocolate-drizzle.png",
  "https://i.ibb.co/0yy36qCQ/Chat-GPT-Image-Feb-17-2026-09-57-55-PM.png",
  "https://i.ibb.co/5xLPmmM6/Chat-GPT-Image-Feb-17-2026-09-58-03-PM.png"
];

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-slate-950" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
              Cleopatra Delights
            </span>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <motion.a href="#menu" className="hover:text-amber-400 transition-colors" whileHover={{ y: -2 }}>Menu</motion.a>
            <motion.a href="#gallery" className="hover:text-amber-400 transition-colors" whileHover={{ y: -2 }}>Gallery</motion.a>
            <motion.a href="#story" className="hover:text-amber-400 transition-colors" whileHover={{ y: -2 }}>Our Story</motion.a>
          </div>
          
          <motion.a 
            href="#order"
            className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-semibold rounded-full text-sm"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(245, 158, 11, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            Order Now
          </motion.a>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-950 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
        
        <motion.div 
          className="relative max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-amber-500/30 text-amber-400 text-sm mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span>Jacksonville's Premier Artisan Bakery</span>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold leading-tight mb-6"
            >
              <span className="text-slate-100">Crafted with</span>
              <br />
              <span className="bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300 bg-clip-text text-transparent">
                Precision & Passion
              </span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-lg text-slate-400 mb-8 max-w-lg leading-relaxed"
            >
              An African engineer's exacting standards meet three continents of 
              culinary heritage. Family-size desserts that transcend ordinary.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <motion.a 
                href="#menu"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-semibold rounded-full"
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(245, 158, 11, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Menu
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a 
                href="#story"
                className="px-8 py-4 border border-slate-700 text-slate-300 font-semibold rounded-full hover:border-amber-500/50 hover:text-amber-400 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Our Story
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 via-indigo-500/20 to-amber-500/20 rounded-3xl blur-3xl" />
            <motion.div 
              className="relative rounded-2xl overflow-hidden border border-slate-800/50 shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <img 
                src="https://i.ibb.co/0yy36qCQ/Chat-GPT-Image-Feb-17-2026-09-57-55-PM.png" 
                alt="Cleopatra Delights Signature Desserts"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 border-y border-slate-800/50 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              { icon: Globe, label: "Continents", value: "3" },
              { icon: Sparkles, label: "Precision", value: "Engineer" },
              { icon: Star, label: "Heritage", value: "Generations" },
              { icon: Clock, label: "Experience", value: "Years" }
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                variants={fadeInUp}
                className="text-center"
              >
                <stat.icon className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-slate-100">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/30 via-slate-950 to-slate-950" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span 
              variants={fadeInUp}
              className="inline-block px-4 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-400 text-sm mb-4"
            >
              Curated Selection
            </motion.span>
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              The <span className="text-amber-400">Collection</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-400 max-w-2xl mx-auto">
              Each creation represents a journey across continents, 
              perfected through the lens of engineering precision.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {products.map((product, index) => (
              <motion.div
                key={product.name}
                variants={scaleIn}
                className="group relative"
              >
                <motion.div 
                  className="relative bg-slate-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-800/50 hover:border-amber-500/30 transition-colors"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative h-56 overflow-hidden">
                    <motion.img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-slate-950/80 border border-slate-700 text-xs text-slate-300">
                        {product.origin}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-slate-100 group-hover:text-amber-400 transition-colors">
                        {product.name}
                      </h3>
                      <span className="text-xl font-bold text-amber-400">{product.price}</span>
                    </div>
                    <p className="text-slate-400 text-sm mb-4">{product.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 rounded-md bg-slate-800 text-xs text-slate-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-slate-800/50">
                      <span className="text-xs text-slate-500">{product.serves}</span>
                      <motion.button 
                        className="text-amber-400 text-sm font-medium hover:text-amber-300 transition-colors"
                        whileHover={{ x: 4 }}
                      >
                        Add to Order →
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
              From Our <span className="text-amber-400">Kitchen</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-400">
              Where engineering meets artistry
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                className="relative aspect-square rounded-xl overflow-hidden group"
                whileHover={{ scale: 1.02 }}
              >
                <img 
                  src={img} 
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 via-slate-950 to-slate-950" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.span 
                variants={fadeInUp}
                className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm mb-6"
              >
                Our Heritage
              </motion.span>
              
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-6">
                Engineering
                <br />
                <span className="text-amber-400">Excellence</span>
              </motion.h2>
              
              <motion.div variants={fadeInUp} className="space-y-4 text-slate-400 leading-relaxed">
                <p>
                  I am an engineer by training, a baker by calling. For decades, I have 
                  nourished my family across three continents — Africa, Asia, and North America.
                </p>
                <p>
                  Every dessert emerging from my kitchen represents the marriage of 
                  engineering precision with recipes passed through generations. From 
                  Egyptian basbousa to Greek baklava to Turkish delight — each perfected 
                  through rigorous iteration.
                </p>
                <p>
                  Now in Jacksonville, I create family-size portions because dessert 
                  should be shared. No diminutive portions. No compromises. Only 
                  authentic, engineered delight.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid gap-4"
            >
              {[
                { flag: "🇪🇬", country: "Egypt", specialty: "Basbousa & Rose", color: "from-amber-600/20 to-amber-800/20" },
                { flag: "🇬🇷", country: "Greece", specialty: "Baklava & Honey", color: "from-blue-600/20 to-indigo-800/20" },
                { flag: "🇹🇷", country: "Turkey", specialty: "Pistachio & Delight", color: "from-emerald-600/20 to-teal-800/20" },
                { flag: "🇺🇸", country: "USA", specialty: "Engineered Classics", color: "from-indigo-600/20 to-purple-800/20" }
              ].map((item, i) => (
                <motion.div
                  key={item.country}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02, x: 8 }}
                  className={`flex items-center gap-4 p-5 rounded-xl bg-gradient-to-r ${item.color} border border-slate-800/50 backdrop-blur-sm`}
                >
                  <span className="text-3xl">{item.flag}</span>
                  <div>
                    <div className="font-semibold text-slate-100">{item.country}</div>
                    <div className="text-sm text-slate-400">{item.specialty}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="order" className="py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-950/30 via-slate-950 to-slate-950" />
        
        <motion.div 
          className="relative max-w-4xl mx-auto px-6 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-6">
            Experience the
            <br />
            <span className="text-amber-400">Extraordinary</span>
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
            Family-size portions, engineered to perfection. 
            Delivered with care throughout Jacksonville.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a 
              href="mailto:orders@cleopatradelights.com"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-semibold rounded-full text-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(245, 158, 11, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-5 h-5" />
              Place Your Order
            </motion.a>
          </motion.div>
          
          <motion.p variants={fadeInUp} className="mt-8 text-slate-500">
            orders@cleopatradelights.com
          </motion.p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800/50 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <ChefHat className="w-4 h-4 text-slate-950" />
              </div>
              <span className="font-bold text-slate-100">Cleopatra Delights</span>
            </div>
            
            <p className="text-slate-500 text-sm">
              © 2024 Cleopatra Delights. An engineer's passion, a family's legacy.
            </p>
            
            <div className="flex gap-4">
              <motion.a 
                href="#" 
                className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}