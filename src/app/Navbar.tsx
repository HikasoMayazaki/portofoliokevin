// /src/components/Navbar.tsx
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/css/Navbar.css';
import Lowk from '../assets/images/ico.png';

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Search', to: '/search' },
    { label: 'Destinations', to: '#destinations' },
    { label: 'Packages', to: '#packages' },
    { label: 'About Us', to: '#about' },
    { label: 'Contact', to: '#contact' },
  ];

  return (
    <>
      <nav className="navbar-container">
        {/* Logo */}
        <NavLink to="/" className="navbar-logo">
            <img src={Lowk} alt="Logo" />
        </NavLink>

        {/* Desktop Navigation Links */}
        <ul className="navbar-links">
          {navLinks.map((link) => (
            <li key={link.label}>
              {link.to.startsWith('#') ? (
                <a href={link.to} className="navbar-link">
                  {link.label}
                </a>
              ) : (
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `navbar-link ${isActive ? 'navbar-link-active' : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="navbar-actions">
          <NavLink to="/search" className="navbar-search-btn" aria-label="Search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </NavLink>
          <button
            className="navbar-menu-btn"
            aria-label="Menu"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`navbar-mobile-menu ${isMobileOpen ? 'navbar-mobile-open' : ''}`}>
        <ul className="navbar-mobile-links">
          {navLinks.map((link) => (
            <li key={link.label}>
              {link.to.startsWith('#') ? (
                <a
                  href={link.to}
                  className="navbar-mobile-link"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `navbar-mobile-link ${isActive ? 'navbar-link-active' : ''}`
                  }
                  onClick={() => setIsMobileOpen(false)}
                >
                  {link.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;