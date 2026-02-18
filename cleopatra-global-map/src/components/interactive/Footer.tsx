import Link from 'next/link';

export default function Footer() {
  return (
    <footer 
      style={{ paddingTop: '96px', paddingBottom: '48px' }}
      className="px-5 md:px-8 lg:px-12 border-t border-mist/30"
    >
      <div className="max-w-[1200px] mx-auto">
        <div 
          className="grid md:grid-cols-3 gap-12 md:gap-16 mb-16"
        >
          {/* Brand */}
          <div>
            <Link 
              href="/" 
              className="font-display text-2xl block mb-6"
              style={{ lineHeight: '1.2' }}
            >
              Cleopatra Delights
            </Link>
            
            <p 
              className="text-text-muted"
              style={{ 
                fontSize: '15px',
                lineHeight: '1.7',
                maxWidth: '32ch'
              }}
            >
              From the pyramids to the world. 
              Mastering sweets across continents.
            </p>
          </div>

          {/* Links */}
          <div>
            <p 
              className="text-text-muted text-xs uppercase tracking-wider mb-6"
              style={{ lineHeight: '1.6' }}
            >
              Explore
            </p>
            
            <div className="space-y-4">
              {[
                { label: 'The Journey', href: '/#journey' },
                { label: 'Weekly Drops', href: '/#drops' },
                { label: 'Full Menu', href: '/menu' },
                { label: 'About', href: '/about' },
              ].map((link) => (
                <Link 
                  key={link.label}
                  href={link.href} 
                  className="block text-text-secondary hover:text-white transition-colors"
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
              className="text-text-muted text-xs uppercase tracking-wider mb-6"
              style={{ lineHeight: '1.6' }}
            >
              Contact
            </p>
            
            <div className="space-y-4">
              <p 
                className="text-text-secondary"
                style={{ fontSize: '15px', lineHeight: '1.6' }}
              >
                hello@cleopatradelights.com
              </p>
              
              <p 
                className="text-text-secondary"
                style={{ fontSize: '15px', lineHeight: '1.6' }}
              >
                Drops every Friday
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div 
          className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-mist/30"
        >
          <p 
            className="text-text-muted text-sm"
            style={{ lineHeight: '1.6' }}
          >
            © 2024 Cleopatra Delights
          </p>
          
          <div className="flex gap-8">
            <a 
              href="#" 
              className="text-text-muted text-sm hover:text-white transition-colors"
              style={{ lineHeight: '1.6' }}
            >
              Instagram
            </a>
            <a 
              href="#" 
              className="text-text-muted text-sm hover:text-white transition-colors"
              style={{ lineHeight: '1.6' }}
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
