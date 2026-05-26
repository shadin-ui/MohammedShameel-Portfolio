import { useCountUp, useScrollReveal } from '../hooks';
import lynqIcon from '../assets/icon lynq.png';
import './Hero.css';

export default function Hero() {
  const [statsRef, statsVisible] = useScrollReveal({ threshold: 0.3 });
  const startups = useCountUp(39, 2000, statsVisible);
  const fundraising = useCountUp(22, 2000, statsVisible);
  const ventures = useCountUp(6, 1500, statsVisible);

  return (
    <section className="hero" id="hero">
      {/* Background */}
      <div className="hero-bg">
        <div className="hero-bg-gradient" />
        <div className="hero-bg-grid" />
        <div className="hero-noise" />
      </div>

      {/* Content Grid wrapped in standard container for perfect horizontal alignment */}
      <div className="container">
        <div className="hero-content">
          {/* Left — Text */}
          <div className="hero-left">
            {/* LYNQ Capital Tag */}
            <div className="hero-tag">
              <img src={lynqIcon} className="hero-tag-logo" alt="LYNQ" />
              LYNQ Capital
            </div>

            <h1 className="hero-title">
              <span className="line">
                <span className="line-inner">Hi, I'm <em>Shameel</em>,</span>
              </span>
              <span className="line">
                <span className="line-inner">an <span className="highlight">Ecosystem Builder</span> based in Kerala.</span>
              </span>
            </h1>

            <p className="hero-subtitle">
              Building structured support systems for early-stage founders — connecting people, structuring operations, and activating networks across 39+ startups.
            </p>

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

          {/* Right — Image */}
          <div className="hero-right">
            <div className="hero-image-wrapper">
              <img
                src="/hero-profile.jpg"
                alt="Mohammed Shameel — Venture Operator"
                className="hero-image"
              />

              {/* Modern Glass Shimmer Sheen Sweep Overlay */}
              <div className="image-shimmer-sheen"></div>

              {/* Sliding Underline Animation */}
              <div className="image-underline"></div>

              {/* Floating Card */}
              <div className="hero-float-card">
                <div className="hero-float-avatar">MS</div>
                <div className="hero-float-info">
                  <h4>Mohammed Shameel</h4>
                  <p>CSO · Venture Operator · LYNQ Capital</p>
                </div>
                <div className="hero-float-badge">Available</div>
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
