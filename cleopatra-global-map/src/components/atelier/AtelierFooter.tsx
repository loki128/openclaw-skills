import Link from 'next/link';

export default function AtelierFooter() {
  return (
    <footer 
      style={{ paddingTop: '96px', paddingBottom: '48px' }}
      className="px-5 md:px-8 lg:px-12 bg-[#0a0a0f] border-t border-[#1a1a1a]"
    >
      <div className="max-w-[1200px] mx-auto">
        <div 
          className="grid md:grid-cols-3 gap-16 mb-20"
        >
          {/* Brand */}
          <div>
            <Link 
              href="/" 
              className="text-white text-xl block mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Cleopatra Delights
            </Link>
            <p 
              className="text-[#666]"
              style={{ fontSize: '15px', lineHeight: '1.7' }}
            >
              Global mastery of sweets.
            </p>
          </div>

          {/* Links */}
          <div>
            <p 
              className="text-[#666] text-xs uppercase tracking-[0.2em] mb-6"
              style={{ lineHeight: '1.6' }}
            >
              Explore
            </p>
            
            <div className="space-y-3">
              {[
                { label: 'The Regions', href: '/#regions' },
                { label: 'Collection', href: '/menu' },
                { label: 'Our Story', href: '/about' },
              ].map((link) => (
                <Link 
                  key={link.label}
                  href={link.href} 
                  className="block text-[#888] hover:text-white transition-colors"
                  style={{ fontSize: '15px', lineHeight: '1.6' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p 
              className="text-[#666] text-xs uppercase tracking-[0.2em] mb-6"
              style={{ lineHeight: '1.6' }}
            >
              Contact
            </p>
            
            <p 
              className="text-[#888] mb-2"
              style={{ fontSize: '15px', lineHeight: '1.6' }}
            >
              hello@cleopatradelights.com
            </p>
            
            <p 
              className="text-[#666] text-sm"
              style={{ lineHeight: '1.6' }}
            >
              New artifacts every Friday
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div 
          className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-[#1a1a1a]"
        >
          <p 
            className="text-[#444] text-sm"
            style={{ lineHeight: '1.6' }}
          >
            © 2024 Cleopatra Delights
          </p>
          
          <div className="flex gap-8"
          >
            <a 
              href="#" 
              className="text-[#666] text-sm hover:text-white transition-colors"
              style={{ lineHeight: '1.6' }}
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
