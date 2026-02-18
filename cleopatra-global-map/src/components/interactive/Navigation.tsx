'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CleanNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-void/90 backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="font-display text-xl">
          Cleopatra
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/#journey" className="text-sm text-text-secondary hover:text-white transition-colors">
            Journey
          </Link>
          <Link href="/#drops" className="text-sm text-text-secondary hover:text-white transition-colors">
            Drops
          </Link>
          <Link href="/menu" className="text-sm text-text-secondary hover:text-white transition-colors">
            Menu
          </Link>
        </div>

        <Link 
          href="/#drops"
          className="text-sm px-5 py-2 border border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-void transition-colors"
        >
          Order
        </Link>
      </div>
    </nav>
  );
}
