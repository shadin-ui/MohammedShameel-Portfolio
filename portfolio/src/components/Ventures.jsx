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
  const [collabRef, collabVisible] = useScrollReveal();

  return (
    <section className="ventures" id="ventures">
      <div className="container">
        <div
          className={`ventures-header reveal ${headerVisible ? 'visible' : ''}`}
          ref={headerRef}
        >
          <span className="section-tag">Portfolio & Ventures</span>
          <h2>
            Ecosystem <span className="text-gradient">Involvement</span>
          </h2>
          <p className="section-desc">
            Directly or indirectly supporting ventures across incubation,
            advisory, and ecosystem building roles.
          </p>
        </div>

        <div className="ventures-grid">
          {VENTURES.map((v, i) => (
            <VentureCard key={v.name} venture={v} index={i} />
          ))}
        </div>

        <div
          className={`collab-bar reveal ${collabVisible ? 'visible' : ''}`}
          ref={collabRef}
        >
          <h4>Ecosystem Collaborators & Partnerships</h4>
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
