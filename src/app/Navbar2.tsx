// /src/components/Navbar.tsx
import { useState, useEffect } from 'react';
import '../assets/css/Navbar.css';
import Lowk from '../assets/images/ico.png';

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll for navbar background
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'News Feed', href: '#news' },
    { label: 'About', href: '#about' },
    { label: 'Pricing', href: '#pricing' },
  ];

  return (
    <>
      <nav className={`nav ${isScrolled ? 'nav-scrolled' : ''}`}>
        {/* Logo */}
        <a href="/" className="nav-logo">
          <img src={Lowk} alt="Logo" />
          <span>tuffulos</span>
        </a>

        {/* Desktop Links */}
        <ul className="nav-links">
          {navLinks.map((link) => (



            <li key={link.label}>
              <a href={link.href} className="nav-link">{link.label}</a>
            </li>
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className="nav-actions">
      
        </div>

        {/* Mobile Toggle */}
        <button
          className={`nav-toggle ${isMobileOpen ? 'nav-toggle-active' : ''}`}
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`nav-mobile ${isMobileOpen ? 'nav-mobile-open' : ''}`}>
        <ul className="nav-mobile-links">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="nav-mobile-link"
                onClick={() => setIsMobileOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-mobile-actions">
        
        </div>
      </div>

      {/* Backdrop */}
      {isMobileOpen && (
        <div className="nav-backdrop" onClick={() => setIsMobileOpen(false)} />
      )}
    </>
  );
};

export default Navbar;