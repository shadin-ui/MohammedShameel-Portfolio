import { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '../hooks';
import './Testimonials.css';

// Import mentor images directly from src/assets for robust Vite bundling
import imgKunhalikutty from '../assets/mentor_kunhalikutty.jpg';
import imgBalagopal from '../assets/mentor_balagopal.png';
import imgVipin from '../assets/mentor_vipin.png';
import imgSaheer from '../assets/mentor_saheer.png';
import imgPhilMurphy from '../assets/mentor_philmurphy.jpg';


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
    featured: true,
    isLinkedIn: false,
    split: true,
    size: 'featured-card' // 8-col bento
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
    featured: false,
    isLinkedIn: true,
    split: false,
    size: 'square-card-right' // 4-col bento
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
    featured: false,
    isLinkedIn: true,
    split: true,
    size: 'wide-card' // 7-col bento
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
    featured: false,
    isLinkedIn: true,
    split: false,
    size: 'square-card-right-sm' // 5-col bento
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
    featured: false,
    isLinkedIn: false,
    split: false,
    size: 'square-card-right'
  }
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);
  const [headerRef, headerVisible] = useScrollReveal();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current.querySelectorAll('.testimonial-card');
    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  // Lock background body scroll when digital pass modal is active
  useEffect(() => {
    if (activeCard) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeCard]);

  // Realistic 3D Card Hover Angle Calculations
  const handleMouseMove = (e) => {
    const card = e.currentTarget.querySelector('.id-card-container');
    if (!card) return;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    const rotateX = -(y / (box.height / 2)) * 14; // Limit to 14 degrees
    const rotateY = (x / (box.width / 2)) * 14;

    card.style.transition = 'none';
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1)`;
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget.querySelector('.id-card-container');
    if (card) {
      card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    }
  };

  return (
    <section id="testimonials" className={`testimonials-section ${activeCard ? 'has-active-modal' : ''}`} ref={sectionRef}>
      <div className="container">
        <div
          className={`testimonials-header reveal ${headerVisible ? 'visible' : ''}`}
          ref={headerRef}
        >
          <span className="section-tag">Ecosystem Endorsements</span>
          <h2>
            Validated by <span className="text-gradient">Ecosystem Leaders</span>
          </h2>
          <p className="testimonials-sub">
            Trusted by government ministers, industrial leaders, strategic mentors, and Forbes Council members for building early-stage ecosystems and empowering next-gen founders.
          </p>
        </div>

        <div className="bento-grid">
          {TESTIMONIALS.map((t, index) => (
            <div
              key={t.id}
              className="testimonial-card"
              onClick={() => setActiveCard(t)}
              style={{ cursor: 'pointer', '--card-index': index }}
            >
              {/* Glass specular sheen background */}
              <div className="card-shine" />

              {/* Iridescent light leak highlight borders */}
              <div className="card-glow-border top" style={{ background: t.gradient }} />
              <div className="card-glow-border bottom" style={{ background: t.gradient }} />

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
                  <p className="author-role">{t.role}</p>

                  {/* Nested left-aligned badge wrapper to prevent layout squeeze */}
                  <div className="author-meta-row">
                    <span className="relationship-badge">{t.type}</span>
                    {t.isLinkedIn ? (
                      <div className="linkedin-quote-icon" title="LinkedIn Recommendation">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                        </svg>
                      </div>
                    ) : (
                      <div className="gov-quote-icon" title="Official Ministerial Endorsement">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 15l-4-4 1.41-1.41L10 13.17l5.59-5.59L17 9l-7 7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="testimonial-content">
                <span className="quote-mark">“</span>
                <p className="quote-text">{t.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Premium Animated ID Card Modal Pass Overlay ── */}
      {activeCard && (
        <div
          className="id-modal-overlay"
          onClick={() => setActiveCard(null)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="id-card-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* spec shine layer */}
            <div className="id-card-shine" />

            {/* Top & Bottom Iridescent Pass Borders */}
            <div className="id-card-glow top" style={{ background: activeCard.gradient }} />
            <div className="id-card-glow bottom" style={{ background: activeCard.gradient }} />

            {/* Pass Header */}
            <div className="id-card-header">
              <div className="id-chip-wrapper" style={{ color: activeCard.featured ? '#FFD700' : '#8B2FC0' }}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="3" width="18" height="18" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <rect x="8" y="8" width="8" height="8" rx="1.5" />
                  <line x1="3" y1="9" x2="8" y2="9" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="3" y1="15" x2="8" y2="15" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="16" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="16" y1="15" x2="21" y2="15" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="9" y1="3" x2="9" y2="8" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="15" y1="3" x2="15" y2="8" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="9" y1="16" x2="9" y2="21" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="15" y1="16" x2="15" y2="21" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>

              <span className="id-pass-serial">
                LYNQ·PASS·2026·{(activeCard.initials + '042').toUpperCase()}
              </span>

              <button className="id-close-btn" onClick={() => setActiveCard(null)} aria-label="Close pass">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Photo Section */}
            <div className="id-photo-frame">
              <img
                src={activeCard.avatar}
                alt={activeCard.name}
                className="id-photo-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="id-photo-fallback" style={{ background: activeCard.gradient }}>
                {activeCard.initials}
              </div>
              <div className="id-hologram-seal" />
            </div>

            {/* Author Credentials */}
            <div className="id-credentials text-center">
              <h3 className="id-name">{activeCard.name}</h3>
              <p className="id-role">{activeCard.role}</p>

              <div className="id-badge-row">
                <span className="id-badge" style={{ borderImage: `${activeCard.gradient} 1` }}>
                  {activeCard.type}
                </span>
              </div>
            </div>

            <div className="id-pass-divider" />

            {/* Endorsement Statement */}
            <div className="id-endorsement-body">
              <span className="id-quote-open">“</span>
              <p className="id-quote-paragraph">{activeCard.text}</p>
            </div>

            {/* Card Footer with Technical Barcode Pass */}
            <div className="id-footer-barcode">
              <div className="id-barcode-lines">
                <div className="b-line w-sm"></div>
                <div className="b-line w-lg"></div>
                <div className="b-line w-md"></div>
                <div className="b-line w-sm"></div>
                <div className="b-line w-lg"></div>
                <div className="b-line w-sm"></div>
                <div className="b-line w-md"></div>
                <div className="b-line w-lg"></div>
                <div className="b-line w-sm"></div>
                <div className="b-line w-md"></div>
                <div className="b-line w-lg"></div>
                <div className="b-line w-sm"></div>
              </div>
              <span className="id-verified-seal">
                {!activeCard.isLinkedIn ? 'MINISTERIAL VERIFIED' : 'SECURE SEC-KEY'}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
