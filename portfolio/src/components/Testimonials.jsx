import { useEffect, useRef, useState, useCallback } from 'react';
import { useScrollReveal } from '../hooks';
import './Testimonials.css';

import imgKunhalikutty from '../assets/mentor_kunhalikutty.jpg';
import imgBalagopal    from '../assets/mentor_balagopal.png';
import imgVipin        from '../assets/mentor_vipin.png';
import imgSaheer       from '../assets/mentor_saheer.png';
import imgPhilMurphy   from '../assets/mentor_philmurphy.jpg';

const TESTIMONIALS = [
  {
    id: 'kunhalikutty',
    name: 'P. K. Kunhalikutty Sahib',
    role: 'Minister for Industries, IT & AI, Government of Keralam',
    text: 'It is always encouraging to see young individuals actively contributing towards meaningful initiatives and building positive networks within society. Wishing him and his team continued success in all their future endeavors.',
    type: 'Ministerial Endorsement',
    avatar: imgKunhalikutty,
    initials: 'KK',
    gradient: 'linear-gradient(135deg, #FFD700 0%, #00FF87 100%)',
    accentColor: '#FFD700',
    featured: true,
    isLinkedIn: false,
    clearance: 'LVL-5 · VIP',
    org: 'Govt. of Keralam',
  },
  {
    id: 'philmurphy',
    name: 'Phil Murphy',
    role: 'Governor of New Jersey, United States',
    text: 'A highly motivated young mind with innovative thinking and a passion for meaningful conversations and connections.',
    type: 'Gubernatorial Endorsement',
    avatar: imgPhilMurphy,
    initials: 'PM',
    gradient: 'linear-gradient(135deg, #003087 0%, #B22222 100%)',
    accentColor: '#4B7BE5',
    featured: false,
    isLinkedIn: false,
    clearance: 'LVL-5 · VIP',
    org: 'State of New Jersey',
  },
  {
    id: 'balagopal',
    name: 'Balagopal Chandrasekhar',
    role: 'Chairman, Keralam State Industrial Development Corporation (KSIDC)',
    text: 'We need more ecosystem enablers like Shameel to help guide and spur startups to the next stage.',
    type: 'Investor & Mentor Endorsement',
    avatar: imgBalagopal,
    initials: 'BC',
    gradient: 'linear-gradient(135deg, #FF64A0 0%, #B46EFF 100%)',
    accentColor: '#FF64A0',
    featured: false,
    isLinkedIn: true,
    clearance: 'LVL-4 · MENTOR',
    org: 'KSIDC',
  },
  {
    id: 'saheer',
    name: 'Dr. Saheer Nelliparamban',
    role: 'Founder & CEO @ Paywint | Forbes Business Council Member',
    text: 'Shameel represents the next generation of ecosystem enablers. His vision for empowering startups, building strategic bridges, and driving collaborations is exceptional. Wishing him the absolute best of luck in shaping the future of early-stage ventures.',
    type: 'Investor & Forbes Council Member',
    avatar: imgSaheer,
    initials: 'SN',
    gradient: 'linear-gradient(135deg, #00FFB2 0%, #007AFF 100%)',
    accentColor: '#00FFB2',
    featured: false,
    isLinkedIn: true,
    clearance: 'LVL-4 · MENTOR',
    org: 'Paywint · Forbes',
  },
  {
    id: 'vipin',
    name: 'Vipin VK',
    role: 'Founder & Principal Strategist @ NaviK Strategy Labs',
    text: 'Mohammed Shameel P, your dedication to empowering startups and fostering collaborations is inspiring! It\'s always a pleasure to engage in those thought-provoking discussions with the founders you bring along—some of which have even led to new ventures. Your ability to connect people and create opportunities is unparalleled, and your achievements at such a young age truly speak volumes. Keep up the fantastic work in shaping the ecosystem.',
    type: 'Strategic Growth Mentor',
    avatar: imgVipin,
    initials: 'VV',
    gradient: 'linear-gradient(135deg, #FFEA78 0%, #FF2D55 100%)',
    accentColor: '#FFEA78',
    featured: false,
    isLinkedIn: true,
    clearance: 'LVL-4 · MENTOR',
    org: 'NaviK Strategy Labs',
  }
];

/* ── ID Card Modal Component ── */
function IDCardModal({ card, onClose }) {
  const cardRef = useRef(null);
  const rafRef  = useRef(null);
  const tilt    = useRef({ rx: 0, ry: 0 });

  // Escape key close
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Smooth 3-D tilt on mouse move
  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const box = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - box.left - box.width  / 2) / (box.width  / 2);
    const y = (e.clientY - box.top  - box.height / 2) / (box.height / 2);
    tilt.current = { rx: -y * 10, ry: x * 10 };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      cardRef.current.style.transform =
        `perspective(1100px) rotateX(${tilt.current.rx}deg) rotateY(${tilt.current.ry}deg) scale(1.02)`;
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    cardRef.current.style.transform =
      'perspective(1100px) rotateX(0deg) rotateY(0deg) scale(1)';
    setTimeout(() => {
      if (cardRef.current) cardRef.current.style.transition = '';
    }, 650);
  }, []);

  const barWidths = [2,4,1,3,2,5,1,3,4,1,2,4,1,3,2,5,3,1,4,2];

  return (
    <div
      className="id-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Animated glowing blob behind card */}
      <div
        className="id-modal-blob"
        style={{ background: card.gradient }}
      />

      <div
        ref={cardRef}
        className="id-card-container"
        onClick={(e) => e.stopPropagation()}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* ── Animated rainbow border ── */}
        <div className="id-rainbow-border" style={{ backgroundImage: card.gradient }} />

        {/* ── Shine sweep layer ── */}
        <div className="id-card-shine" />

        {/* ── Top glow bar ── */}
        <div className="id-card-glow top" style={{ background: card.gradient }} />
        <div className="id-card-glow bottom" style={{ background: card.gradient }} />

        {/* ── Close ── */}
        <button className="id-close-btn" onClick={onClose} aria-label="Close">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6"  x2="6"  y2="18"/>
            <line x1="6"  y1="6"  x2="18" y2="18"/>
          </svg>
        </button>

        {/* ── Lanyard hole ── */}
        <div className="id-card-lanyard-slot">
          <div className="id-card-slot-hole" />
        </div>

        {/* ── Header strip ── */}
        <div className="id-card-header">
          <span className="id-card-title">ECOSYSTEM VIP PASS</span>
          <span className="id-pass-serial">
            {(card.initials + '-2026').toUpperCase()}
          </span>
        </div>

        {/* ── Body ── */}
        <div className="id-card-body">

          {/* Photo section */}
          <div className="id-photo-container">
            <div
              className="id-photo-frame"
              style={{
                background: `linear-gradient(var(--id-photo-bg, #080410), var(--id-photo-bg, #080410)) padding-box, ${card.gradient} border-box`,
                border: '3px solid transparent'
              }}
            >
              <img
                src={card.avatar}
                alt={card.name}
                className="id-photo-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div
                className="id-photo-fallback"
                style={{ background: card.gradient }}
              >
                {card.initials}
              </div>
            </div>

            {/* Green online dot */}
            <span className="id-status-dot" />

            {/* Hologram seal stamp */}
            <div className="id-hologram-seal" />
          </div>

          {/* Name + role + badge */}
          <h3 className="id-name">{card.name}</h3>
          <p  className="id-role">{card.role}</p>

          <div className="id-badge" style={{ '--badge-grad': card.gradient }}>
            {card.isLinkedIn ? (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            ) : (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 15l-4-4 1.41-1.41L10 13.17l5.59-5.59L17 9l-7 7z"/>
              </svg>
            )}
            {card.type}
          </div>

          {/* Metadata grid */}
          <div className="id-meta-grid">
            <div className="id-meta-item">
              <span className="id-meta-label">PASS TYPE</span>
              <span className="id-meta-value">{card.isLinkedIn ? 'LinkedIn' : 'Official'}</span>
            </div>
            <div className="id-meta-item">
              <span className="id-meta-label">CLEARANCE</span>
              <span className="id-meta-value">{card.clearance}</span>
            </div>
            <div className="id-meta-item">
              <span className="id-meta-label">ORGANISATION</span>
              <span className="id-meta-value">{card.org}</span>
            </div>
            <div className="id-meta-item">
              <span className="id-meta-label">STATUS</span>
              <span className="id-meta-value status-active">● ACTIVE</span>
            </div>
          </div>

          {/* Quote scroll area */}
          <div className="id-quote-container">
            <span className="id-quote-mark">"</span>
            <p className="id-quote-text">{card.text}</p>
          </div>

        </div>{/* /id-card-body */}

        {/* ── Footer ── */}
        <div className="id-card-footer">
          <div className="id-barcode-section">
            <div className="id-barcode-lines">
              {barWidths.map((w, i) => (
                <span key={i} className="b-line" style={{ width: `${w}px` }} />
              ))}
            </div>
            <span className="id-barcode-number">*{(card.id + '-2026').toUpperCase()}*</span>
          </div>
          <span className="id-verification-watermark">
            {card.isLinkedIn ? '✦ PROFESSIONAL VERIFIED ✦' : '✦ MINISTERIALLY VERIFIED ✦'}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Main Testimonials Section ── */
export default function Testimonials() {
  const sectionRef   = useRef(null);
  const [activeCard, setActiveCard] = useState(null);
  const [headerRef, headerVisible]  = useScrollReveal();

  // Stagger reveal cards
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    const cards = sectionRef.current?.querySelectorAll('.testimonial-card') ?? [];
    cards.forEach((c) => obs.observe(c));
    return () => cards.forEach((c) => obs.unobserve(c));
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = activeCard ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeCard]);

  // Card 3-D hover
  const onCardMove = (e) => {
    const card = e.currentTarget;
    const box  = card.getBoundingClientRect();
    const rx   = -((e.clientY - box.top  - box.height / 2) / (box.height / 2)) * 8;
    const ry   =  ((e.clientX - box.left - box.width  / 2) / (box.width  / 2)) * 8;
    card.style.transition = 'none';
    card.style.transform  = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
  };
  const onCardLeave = (e) => {
    const card = e.currentTarget;
    card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    card.style.transform  = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  const closeModal = useCallback(() => setActiveCard(null), []);

  return (
    <section
      id="testimonials"
      className={`testimonials-section ${activeCard ? 'has-active-modal' : ''}`}
      ref={sectionRef}
    >
      <div className="container">
        {/* Header */}
        <div className={`testimonials-header reveal ${headerVisible ? 'visible' : ''}`} ref={headerRef}>
          <span className="section-tag">Ecosystem Endorsements</span>
          <h2>Validated by <span className="text-gradient">Ecosystem Leaders</span></h2>
          <p className="testimonials-sub">
            Trusted by government ministers, industrial leaders, strategic mentors, and Forbes Council
            members for building early-stage ecosystems and empowering next-gen founders.
          </p>
        </div>

        {/* Grid */}
        <div className="bento-grid">
          {TESTIMONIALS.map((t, index) => (
            <div
              key={t.id}
              className="testimonial-card"
              style={{ cursor: 'pointer', '--card-index': index }}
              onClick={() => setActiveCard(t)}
              onMouseMove={onCardMove}
              onMouseLeave={onCardLeave}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setActiveCard(t)}
            >
              {/* Shine sweep */}
              <div className="card-shine" />
              {/* Gradient borders */}
              <div className="card-glow-border top"    style={{ background: t.gradient }} />
              <div className="card-glow-border bottom" style={{ background: t.gradient }} />

              {/* Avatar + info */}
              <div className="testimonial-header">
                <div className="avatar-wrapper size-large">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="avatar-image"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="avatar-fallback" style={{ background: t.gradient }}>
                    {t.initials}
                  </div>
                </div>

                <div className="author-info">
                  <h4 className="author-name">{t.name}</h4>
                  <p  className="author-role">{t.role}</p>
                  <div className="author-meta-row">
                    <span className="relationship-badge">{t.type}</span>
                    {t.isLinkedIn ? (
                      <div className="linkedin-quote-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                        </svg>
                      </div>
                    ) : (
                      <div className="gov-quote-icon">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 15l-4-4 1.41-1.41L10 13.17l5.59-5.59L17 9l-7 7z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="testimonial-content">
                <span className="quote-mark">"</span>
                <p className="quote-text">{t.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ID Card Modal — rendered via portal-like pattern inside section */}
      {activeCard && <IDCardModal card={activeCard} onClose={closeModal} />}
    </section>
  );
}
