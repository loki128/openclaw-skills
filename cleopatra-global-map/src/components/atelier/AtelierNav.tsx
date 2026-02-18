'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AtelierNav() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-[#0a0a0f]/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div 
        className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-12 py-6 flex items-center justify-between"
      >
        <Link 
          href="/" 
          className="text-white text-lg"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Cleopatra
        </Link>

        <div className="hidden md:flex items-center gap-10"
        >
          <Link 
            href="/#regions" 
            className="text-[#888] text-sm hover:text-white transition-colors"
            style={{ lineHeight: '1.6' }}
          >
            Regions
          </Link>
          
          <Link 
            href="/menu" 
            className="text-[#888] text-sm hover:text-white transition-colors"
            style={{ lineHeight: '1.6' }}
          >
            Collection
          </Link>
        </div>

        <Link 
          href="/#drop"
          className="text-sm text-[#d4af37] border-b border-[#d4af37] pb-0.5 hover:text-white hover:border-white transition-colors"
          style={{ lineHeight: '1.6' }}
        >
          Order
        </Link>
      </div>
    </nav>
  );
}
