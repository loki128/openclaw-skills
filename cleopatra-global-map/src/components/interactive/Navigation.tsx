'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-void/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div 
        className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-12 py-6 flex items-center justify-between"
      >
        <Link href="/" className="font-display text-xl tracking-tight">
          Cleopatra
        </Link>

        <div className="hidden md:flex items-center gap-10"
        >
          <Link 
            href="/#journey" 
            className="text-sm text-text-secondary hover:text-white transition-colors"
            style={{ lineHeight: '1.6' }}
          >
            Journey
          </Link>
          
          <Link 
            href="/#drops" 
            className="text-sm text-text-secondary hover:text-white transition-colors"
            style={{ lineHeight: '1.6' }}
          >
            Drops
          </Link>
          
          <Link 
            href="/menu" 
            className="text-sm text-text-secondary hover:text-white transition-colors"
            style={{ lineHeight: '1.6' }}
          >
            Menu
          </Link>
        </div>

        <Link 
          href="/#drops"
          className="text-sm px-6 py-3 border border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-void transition-colors"
          style={{ minHeight: '44px', lineHeight: '1.5' }}
        >
          Order
        </Link>
      </div>
    </nav>
  );
}
