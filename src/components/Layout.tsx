import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Compass, Menu, X } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { content } = useCMS();
  const { siteSettings, nav, footer, contact } = content;

  return (
    <div className="min-h-screen flex flex-col">
      <nav className={`absolute top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center ${isHome ? 'text-savannah-light' : 'text-savannah-dark bg-savannah-sand/90 backdrop-blur-md shadow-sm'}`}>
        <Link to="/" className="flex items-center gap-2">
          {siteSettings.logoImage ? (
            <img src={siteSettings.logoImage} alt="Logo" style={{ width: `${siteSettings.logoWidth || '160'}px`, height: 'auto', maxHeight: '120px' }} className="object-contain" />
          ) : (
            <Compass className="w-8 h-8 text-savannah-sage" />
          )}
          <span className="font-serif text-2xl font-bold tracking-wide" style={isHome ? { textShadow: '0 2px 4px rgba(0,0,0,0.5)' } : {}}>
            {siteSettings.logoText}<span className="text-savannah-sage">{siteSettings.logoSubtext}</span>
          </span>
        </Link>
        <div className="hidden md:flex gap-8 font-medium tracking-wide text-sm uppercase" style={isHome ? { textShadow: '0 2px 4px rgba(0,0,0,0.5)' } : {}}>
          {nav.links.map((link) => (
            <Link key={link.path + link.label} to={link.path} className="hover:text-savannah-sage transition-colors">{link.label}</Link>
          ))}
        </div>
        <button className={`hidden md:block px-6 py-2 border border-savannah-sage rounded-full uppercase text-sm font-medium tracking-wider transition-colors ${isHome ? 'text-savannah-light bg-black/20 backdrop-blur-sm hover:bg-savannah-sage hover:text-white' : 'text-savannah-sage hover:bg-savannah-sage hover:text-white'}`}>
          {nav.bookNowText}
        </button>
        <button className="md:hidden p-2 text-savannah-sage" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu className="w-7 h-7" />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-savannah-dark text-savannah-sand flex flex-col">
          <div className="p-6 flex justify-between items-center border-b border-savannah-leaf/20">
            <Link to="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
              {siteSettings.logoImage ? (
                <img src={siteSettings.logoImage} alt="Logo" style={{ width: `${siteSettings.logoWidth || '140'}px`, height: 'auto', maxHeight: '100px' }} className="object-contain" />
              ) : (
                <Compass className="w-8 h-8 text-savannah-sage" />
              )}
            </Link>
            <button className="p-2 text-savannah-sand hover:text-savannah-sage transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
              <X className="w-8 h-8" />
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-8 p-6">
            {nav.links.map((link) => (
              <Link key={link.path + link.label} to={link.path} className="text-3xl font-serif text-savannah-light hover:text-savannah-sage transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
            <button className="mt-8 w-full max-w-xs px-8 py-4 border-2 border-savannah-sage rounded-full uppercase text-sm font-bold tracking-wider text-savannah-light hover:bg-savannah-sage hover:text-white transition-all shadow-md" onClick={() => setIsMobileMenuOpen(false)}>
              {nav.bookNowText}
            </button>
          </div>
        </div>
      )}

      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      <footer className="bg-[#151A11] text-savannah-sand/60 py-16 border-t border-savannah-leaf/20 mt-auto">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 text-savannah-light mb-6">
              {siteSettings.logoImage ? (
                <img src={siteSettings.logoImage} alt="Logo" style={{ width: `${siteSettings.logoWidth || '160'}px`, height: 'auto', maxHeight: '120px' }} className="object-contain" />
              ) : (
                <Compass className="w-8 h-8 text-savannah-sage" />
              )}
              <span className="font-serif text-2xl font-bold tracking-wide">{siteSettings.logoText}<span className="text-savannah-sage">{siteSettings.logoSubtext}</span></span>
            </div>
            <p className="max-w-md mb-8 leading-relaxed">{footer.tagline}</p>
            <div className="flex gap-4">
              {footer.socialLinks.map((s) => (
                <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-savannah-leaf hover:text-white transition-colors cursor-pointer">
                  <span className="font-serif italic text-sm">{s.icon}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-savannah-light font-serif text-xl mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {nav.links.map((link) => (
                <li key={link.path + link.label}><Link to={link.path} className="hover:text-savannah-sage transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-savannah-light font-serif text-xl mb-6">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>{contact.email1}</li>
              <li>{contact.phone1}</li>
              <li className="whitespace-pre-line">{contact.address}</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 text-sm text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <p>{footer.copyrightText}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-savannah-light">Privacy Policy</a>
            <a href="#" className="hover:text-savannah-light">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
