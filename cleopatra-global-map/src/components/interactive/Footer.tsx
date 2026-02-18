'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    explore: [
      { label: 'The Journey', href: '/#journey' },
      { label: 'Weekly Drops', href: '/#drops' },
      { label: 'Global Menu', href: '/menu' },
      { label: 'Passport', href: '/passport' },
    ],
    company: [
      { label: 'Our Story', href: '/about' },
      { label: 'Craft & Technique', href: '/about#craft' },
      { label: 'Contact', href: '/about#contact' },
    ],
    social: [
      { label: 'Instagram', href: '#' },
      { label: 'Twitter', href: '#' },
      { label: 'TikTok', href: '#' },
    ],
  };

  return (
    <footer className="relative bg-void border-t border-mist">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gold-400 flex items-center justify-center">
                <span className="text-void font-bold text-xl">C</span>
              </div>
              <div>
                <span className="font-display text-2xl tracking-wide block">Cleopatra</span>
                <span className="font-display text-2xl tracking-wide text-gold-400">Delights</span>
              </div>
            </Link>
            
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              From the pyramids to the world. 
              Mastering sweets across continents since 2018.
            </p>
            
            <div className="flex gap-4">
              {footerLinks.social.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 border border-mist flex items-center justify-center text-text-muted hover:border-gold-400 hover:text-gold-400 transition-colors"
                >
                  <span className="text-xs">{social.label[0]}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Explore Column */}
          <div>
            <h4 className="font-display text-lg mb-6">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-text-secondary hover:text-gold-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-display text-lg mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-text-secondary hover:text-gold-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-display text-lg mb-6">Get in Touch</h4>
            
            <div className="space-y-4">
              <div>
                <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Text to Order</p>
                <p className="text-gold-400 font-display text-xl">+1 (555) CLEO-MAP</p>
              </div>
              
              <div>
                <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Email</p>
                <a href="mailto:hello@cleopatradelights.com" className="text-text-secondary hover:text-gold-400 transition-colors">
                  hello@cleopatradelights.com
                </a>
              </div>
              
              <div>
                <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Drop Schedule</p>
                <p className="text-text-secondary">Every Friday at Midnight EST</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-mist">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-text-muted text-sm">
              © {currentYear} Cleopatra Delights. All rights reserved.
            </p>
            
            <div className="flex gap-6">
              <a href="#" className="text-text-muted hover:text-gold-400 text-sm transition-colors">Privacy</a>
              <a href="#" className="text-text-muted hover:text-gold-400 text-sm transition-colors">Terms</a>
              <a href="#" className="text-text-muted hover:text-gold-400 text-sm transition-colors">Shipping</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
