import { useScrollReveal } from '../hooks';
import lynqLogo from '../assets/Lynq logo Svg (2).svg';
import './Ventures.css';

const VENTURES = [
  {
    name: 'LYNQ Capital',
    role: 'Founder & Operator',
    desc: 'Building structured support systems for early-stage founders — combining strategy, operations, and network activation.',
    tags: ['Venture Capital', 'Ecosystem', 'Advisory'],
    color: 'purple',
    icon: <img src={lynqLogo} className="lynq-featured-logo" alt="LYNQ Capital" />,
    featured: true,
  },
  {
    name: 'SnapShare AI',
    role: 'Co-Founder & Operator',
    desc: 'Instant AI Photo Delivery for events and photographers using facial recognition — connecting guests to their photos in seconds.',
    tags: ['AI / ML', 'SaaS', 'Facial Recognition', 'Event Tech'],
    color: 'sky',
    bigPortfolio: true,
    tagline: 'Instant AI Photo Delivery for Events using Facial Recognition',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
  },
  {
    name: 'ZilCubator',
    role: 'Director & Secretary',
    desc: 'Leadership in ecosystem entity focused on startup incubation and acceleration.',
    tags: ['Incubation', 'Leadership'],
    color: 'blue',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
  },
  {
    name: 'Blulines',
    role: 'Growth Support',
    desc: 'Contributing to strategic direction and operational scaling for early-stage growth.',
    tags: ['Startup', 'Growth'],
    color: 'teal',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    name: 'FitMyJob',
    role: 'Startup Involvement',
    desc: 'Advisory and strategic positioning support for early-stage growth.',
    tags: ['HR Tech', 'Advisory'],
    color: 'amber',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    name: 'Paywint',
    role: 'Growth Support',
    desc: 'Fintech startup involvement with strategic growth and operational structuring.',
    tags: ['Fintech', 'Operations'],
    color: 'rose',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" />
      </svg>
    ),
  },
  {
    name: 'Pitmasters Café',
    role: 'Expansion Support',
    desc: 'Strategic expansion support for F&B venture growth and new market entry.',
    tags: ['F&B', 'Expansion'],
    color: 'emerald',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
];

const COLLABS = [
  'TheCubStudio', 'Kerlytix', 'Unifirmasia', 'Barbarians',
  'MOWS Coworks', 'MFC Ecosystem', 'KTX Ecosystem',
];

export default function Ventures() {
  const [headerRef, headerVisible] = useScrollReveal();
  const [snapRef, snapVisible] = useScrollReveal({ threshold: 0.15 });
  const [collabRef, collabVisible] = useScrollReveal();

  const snapShare = VENTURES.find(v => v.bigPortfolio);
  const others = VENTURES.filter(v => !v.bigPortfolio);

  return (
    <section className="ventures" id="ventures">
      <div className="container">
        <div
          className={`ventures-header reveal ${headerVisible ? 'visible' : ''}`}
          ref={headerRef}
        >
          <span className="section-tag">Portfolio &amp; Ventures</span>
          <h2>
            Ecosystem <span className="text-gradient">Involvement</span>
          </h2>
          <p className="section-desc">
            Directly or indirectly supporting ventures across incubation,
            advisory, and ecosystem building roles.
          </p>
        </div>

        {/* SnapShare AI — Big Portfolio Spotlight */}
        <div
          className={`snapshare-spotlight reveal ${snapVisible ? 'visible' : ''}`}
          ref={snapRef}
        >
          <div className="snapshare-left">
            <div className="snapshare-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              Big Portfolio
            </div>
            <h3 className="snapshare-name">SnapShare <em>AI</em></h3>
            <p className="snapshare-role">{snapShare.role}</p>
            <p className="snapshare-tagline">
              Instant AI Photo Delivery for Events<br />
              and Photographers using{' '}
              <span className="snapshare-highlight">AI facial Recognition.</span>
            </p>
            <p className="snapshare-desc">{snapShare.desc}</p>
            <div className="snapshare-tags">
              {snapShare.tags.map(t => <span key={t} className="snapshare-tag">{t}</span>)}
            </div>
          </div>
          <div className="snapshare-right">
            <div className="snapshare-card">
              <div className="snapshare-card-glow" />
              <div className="snapshare-icon-ring">
                <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
              <div className="snapshare-card-label">SnapShare AI</div>
              <div className="snapshare-face-detect">
                <div className="face-corner tl" />
                <div className="face-corner tr" />
                <div className="face-corner bl" />
                <div className="face-corner br" />
                <div className="face-dot" />
              </div>
              <div className="snapshare-scan-line" />
            </div>
          </div>
        </div>

        <div className="ventures-grid">
          {others.map((v, i) => (
            <VentureCard key={v.name} venture={v} index={i} />
          ))}
        </div>

        <div
          className={`collab-bar reveal ${collabVisible ? 'visible' : ''}`}
          ref={collabRef}
        >
          <h4>Ecosystem Collaborators &amp; Partnerships</h4>
          <div className="collab-list">
            {COLLABS.map((name) => (
              <span className="collab-chip" key={name}>{name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function VentureCard({ venture, index }) {
  const [ref, visible] = useScrollReveal();
  const { name, role, desc, tags, color, icon, featured } = venture;

  return (
    <div
      ref={ref}
      className={`venture-card reveal reveal-delay-${Math.min(index + 1, 5)} ${featured ? 'featured' : ''} ${visible ? 'visible' : ''}`}
    >
      <div className={`venture-icon ${color}`}>{icon}</div>
      <div>
        <h3>{name}</h3>
        <p className="venture-role">{role}</p>
        <p className="venture-desc">{desc}</p>
        <div className="venture-tags">
          {tags.map((t) => <span key={t}>{t}</span>)}
        </div>
      </div>
    </div>
  );
}
