import { useCountUp, useScrollReveal } from '../hooks';
import lynqIcon from '../assets/icon lynq.png';
import './Hero.css';

export default function Hero() {
  const [statsRef, statsVisible] = useScrollReveal({ threshold: 0.3 });
  const startups = useCountUp(39, 2000, statsVisible);
  const fundraising = useCountUp(22, 2000, statsVisible);
  const ventures = useCountUp(6, 1500, statsVisible);

  const scrollToSection = (id) => {
    const el = document.querySelector(id);
    if (el) {
      if (window.lenis) {
        window.lenis.scrollTo(el, { duration: 1.4 });
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const triggerCallScheduler = () => {
    if (window.selectContactTab) {
      window.selectContactTab('scheduler');
    }
    scrollToSection('#contact');
  };

  return (
    <section className="hero" id="hero">
      {/* Background */}
      <div className="hero-bg">
        <div className="hero-bg-gradient" />
        <div className="hero-bg-grid" />
        <div className="hero-noise" />
      </div>

      <div className="container">
        <div className="hero-content">

          {/* ── Left — Text column ── */}
          <div className="hero-left">
            {/* LYNQ Tag */}
            <div className="hero-tag">
              <img src={lynqIcon} className="hero-tag-logo" alt="LYNQ" />
              LYNQ Capital
            </div>

            {/* Title */}
            <h1 className="hero-title">
              <span className="line">
                <span className="line-inner">
                  Hi, I'm <em>Shameel</em>,
                </span>
              </span>
              <span className="line">
                <span className="line-inner">
                  an <span className="highlight">Ecosystem Builder</span> based in India.
                </span>
              </span>
            </h1>

            {/* ── MOBILE ONLY: centered photo between title & subtitle ── */}
            <div className="hero-mobile-photo">
              <div className="hero-mobile-photo-ring">
                <img
                  src="/hero-profile.png"
                  alt="Mohammed Shameel"
                  className="hero-mobile-photo-img"
                />
                {/* Floating card inside photo container matching the desktop layout */}
                <div className="hero-mobile-float-card">
                  <div className="hero-mobile-float-avatar">
                    <img src={lynqIcon} alt="LYNQ" />
                  </div>
                  <div className="hero-mobile-float-info">
                    <h4>Mohammed Shameel</h4>
                    <p>CSO · Venture Operator · LYNQ Capital</p>
                  </div>
                  <div className="hero-mobile-float-badge">
                    Available
                  </div>
                </div>
              </div>
            </div>

            {/* Subtitle */}
            <p className="hero-subtitle">
              I build structured support systems that help early-stage founders scale. My work focuses
              on connecting the right people, organizing complex operations, and unlocking network
              effects across a portfolio of 39+ startups.
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta-group">
              <button onClick={() => scrollToSection('#ventures')} className="hero-cta-btn primary">
                <span>Explore Work</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="btn-arrow">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
              <button onClick={triggerCallScheduler} className="hero-cta-btn secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="btn-icon">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>Schedule a Call</span>
              </button>
            </div>

            {/* Stats bar */}
            <div className="hero-bottom-bar" ref={statsRef}>
              <div className="hero-stat">
                <span className="hero-stat-number">
                  {startups}<span className="suffix">+</span>
                </span>
                <span className="hero-stat-label">Startups Supported</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-number">
                  <span className="prefix">₹</span>{fundraising}<span className="suffix">Cr+</span>
                </span>
                <span className="hero-stat-label">Fundraising Exposure</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-number">
                  {ventures}<span className="suffix">+</span>
                </span>
                <span className="hero-stat-label">Active Ventures</span>
              </div>
            </div>
          </div>

          {/* ── Right — Full image (desktop only, hidden on mobile) ── */}
          <div className="hero-right">
            <div className="hero-image-wrapper">
              <img
                src="/hero-new.png"
                alt="Mohammed Shameel"
                className="hero-image default-image"
              />
              <img
                src="/hero-profile.png"
                alt="Mohammed Shameel — Venture Operator"
                className="hero-image hover-image"
              />

              {/* Shimmer & underline overlays */}
              <div className="image-shimmer-sheen" />
              <div className="image-underline" />

              {/* Floating info card */}
              <div className="hero-float-card">
                <div className="hero-float-avatar">
                  <img src={lynqIcon} alt="LYNQ" />
                </div>
                <div className="hero-float-info">
                  <h4>Mohammed Shameel</h4>
                  <p>CSO · Venture Operator · LYNQ Capital</p>
                </div>
                <div className="hero-float-badge live">
                  <span className="live-indicator-dot"></span>
                  Live
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll">
        <svg className="scroll-mouse-icon" width="20" height="32" viewBox="0 0 20 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="18" height="30" rx="9" stroke="rgba(168, 85, 217, 0.6)" strokeWidth="2" />
          <circle cx="10" cy="9" r="2" fill="#10b981" className="scroll-mouse-wheel" />
        </svg>
        <span className="scroll-text">Scroll</span>
      </div>
    </section>
  );
}
