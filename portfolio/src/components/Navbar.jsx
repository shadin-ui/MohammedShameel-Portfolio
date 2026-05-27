import { useState, useEffect } from 'react';
import { useTheme } from '../ThemeContext';
import './Navbar.css';

const NAV_ITEMS = [
  { 
    label: 'About', 
    href: '#about', 
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ) 
  },
  { 
    label: 'Ventures', 
    href: '#ventures', 
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ) 
  },
  { 
    label: 'Expertise', 
    href: '#expertise', 
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ) 
  },
  { 
    label: 'Education', 
    href: '#education', 
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 1.1 2.7 2 6 2s6-.9 6-2v-5" />
      </svg>
    ) 
  },
  { 
    label: 'Endorsements', 
    href: '#testimonials', 
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ) 
  },
  { 
    label: 'Contact', 
    href: '#contact', 
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ) 
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isNearFooter, setIsNearFooter] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 400);

      // Check if we are near the bottom (in the footer zone)
      const totalHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const isAtFooter = totalHeight - (currentScroll + viewportHeight) < 220;
      setIsNearFooter(isAtFooter);

      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach((section) => {
        const top = section.offsetTop - 250;
        if (currentScroll >= top) {
          current = section.getAttribute('id');
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href) => {
    setMobileOpen(false);
    document.body.style.overflow = '';
    const el = document.querySelector(href);
    if (el) {
      if (window.lenis) {
        window.lenis.scrollTo(el, { duration: 1.4 });
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
    document.body.style.overflow = mobileOpen ? '' : 'hidden';
  };

  return (
    <>
      {/* ── Top Navbar (visible initially) ── */}
      <nav className={`navbar-top ${scrolled ? 'navbar-top--hidden' : ''}`}>
        <div className="container">
          <div className="nav-inner">
            <a href="#hero" className="nav-logo" onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}>
              <span className="logo-text" style={{ textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '800' }}>SHAMEEL</span>
            </a>

            <div className="nav-center-top">
              {NAV_ITEMS.slice(0, 5).map(({ label, href }) => (
                <button
                  key={href}
                  className={`nav-pill ${activeSection === href.slice(1) ? 'active' : ''}`}
                  onClick={() => scrollTo(href)}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="nav-right-group">
              {/* Minimalist Theme Toggle Icon Button */}
              <button className="theme-toggle-minimal" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === 'dark' ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" fill="currentColor" />
                    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>

              <button className="nav-cta nav-cta-desktop" onClick={() => scrollTo('#contact')}>
                Let's Connect
              </button>

              <button
                className={`nav-toggle ${mobileOpen ? 'active' : ''}`}
                onClick={toggleMobile}
                aria-label="Toggle menu"
              >
                <span /><span /><span />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Bottom Floating Navbar (appears on scroll, hides in footer) ── */}
      <nav className={`navbar-bottom ${scrolled && !isNearFooter ? 'navbar-bottom--visible' : ''}`}>
        <div className="bottom-nav-inner">
          {NAV_ITEMS.map(({ label, href, icon }) => (
            <button
              key={href}
              className={`bottom-nav-item ${activeSection === href.slice(1) ? 'active' : ''}`}
              onClick={() => scrollTo(href)}
            >
              <span className="bottom-nav-icon">{icon}</span>
              <span className="bottom-nav-label">{label}</span>
            </button>
          ))}

          {/* Theme Toggle in bottom nav */}
          <button
            className="bottom-nav-item bottom-nav-theme"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <span className="bottom-nav-icon">
              {theme === 'dark' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" fill="currentColor" />
                  <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </span>
            <span className="bottom-nav-label">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </nav>

      {/* ── Floating Scroll Up Button ── */}
      <button 
        className={`scroll-up-btn ${scrolled ? 'scroll-up-btn--visible' : ''} ${isNearFooter ? 'scroll-up-btn--highlight' : ''}`}
        onClick={() => {
          if (window.lenis) {
            window.lenis.scrollTo(0, { duration: 1.4 });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        aria-label="Scroll to top"
      >
        <span className="scroll-up-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </span>
        <span className="scroll-up-text">Back to Top</span>
      </button>

      {/* ── Floating Theme Toggle Button (LEFT side) — mirrors scroll-up on right ── */}
      <button
        className={`theme-float-btn ${scrolled ? 'theme-float-btn--visible' : ''}`}
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        <span className="theme-float-icon">
          {theme === 'dark' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" fill="currentColor" />
              <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </span>
      </button>

      {/* Mobile Overlay */}
      <div className={`mobile-overlay ${mobileOpen ? 'active' : ''}`}>
        <div className="mobile-nav-links">
          {NAV_ITEMS.map(({ label, href }, index) => (
            <button
              key={href}
              className={`mobile-nav-link ${activeSection === href.slice(1) ? 'active' : ''}`}
              onClick={() => scrollTo(href)}
            >
              <span className="mobile-nav-num">0{index + 1}</span>
              <span className="mobile-nav-label">{label}</span>
            </button>
          ))}
        </div>

        {/* Proper toggle switch row */}
        <div className="mobile-theme-row">
          <span className="mobile-theme-label">
            {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
          </span>
          <button
            className={`theme-toggle-switch ${theme === 'light' ? 'is-light' : ''}`}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <span className="toggle-track">
              <span className="toggle-thumb">
                {theme === 'dark' ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="5" fill="currentColor" />
                    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  </svg>
                )}
              </span>
            </span>
          </button>
        </div>

        <button className="nav-cta mobile-nav-cta" onClick={() => scrollTo('#contact')}>
          Let's Connect
        </button>
      </div>
    </>
  );
}
