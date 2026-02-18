import Link from 'next/link';

export default function CleanFooter() {
  return (
    <footer className="py-20 px-6 border-t border-mist/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link href="/" className="font-display text-2xl block mb-4">
              Cleopatra Delights
            </Link>
            <p className="text-text-muted text-sm">
              From the pyramids to the world.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-text-muted text-xs uppercase tracking-wider mb-4">Explore</p>
            <div className="space-y-2">
              <Link href="/#journey" className="block text-sm text-text-secondary hover:text-white transition-colors">The Journey</Link>
              <Link href="/#drops" className="block text-sm text-text-secondary hover:text-white transition-colors">Weekly Drops</Link>
              <Link href="/menu" className="block text-sm text-text-secondary hover:text-white transition-colors">Full Menu</Link>
              <Link href="/about" className="block text-sm text-text-secondary hover:text-white transition-colors">About</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-text-muted text-xs uppercase tracking-wider mb-4">Contact</p>
            <p className="text-sm text-text-secondary mb-2">hello@cleopatradelights.com</p>
            <p className="text-sm text-text-secondary">Drops every Friday</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-mist/30">
          <p className="text-text-muted text-xs">© 2024 Cleopatra Delights</p>
          <div className="flex gap-6">
            <a href="#" className="text-text-muted text-xs hover:text-white transition-colors">Instagram</a>
            <a href="#" className="text-text-muted text-xs hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
