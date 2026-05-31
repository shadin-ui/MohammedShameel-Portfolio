import { useScrollReveal } from '../hooks';
import lynqLogo from '../assets/Lynq logo Svg (2).svg';
import zilcubatorLogo from '../assets/zilcubator_logo.png';
import pitmastersLogo from '../assets/pitmasters_logo.png';
import blulinesLogo from '../assets/blulines_logo.png';
import fitmyjobLogo from '../assets/fitmyjob_logo.png';
import paywintLogo from '../assets/paywint_logo.png';
import snapshareLogo from '../assets/snapshare_logo.png';
import kerlytixLogo from '../assets/kerlytix_logo.png';
import cubstudioLogo from '../assets/cubstudio_logo.png';
import './Ventures.css';

const VENTURES = [
  {
    name: 'LYNQ Capital',
    role: 'co-Founder & Operator',
    desc: 'Laying down the structural foundation early-stage founders need—bringing absolute clarity to strategy, investor relations, and capital orchestration.',
    tags: ['Venture Capital', 'Ecosystem', 'Advisory'],
    color: 'purple',
    icon: <img src={lynqLogo} className="lynq-featured-logo" alt="LYNQ Capital" />,
    featured: true,
  },
  {
    name: 'SnapShare AI',
    role: 'Revenue Sharing Partner',
    desc: 'A high-growth SaaS platform delivering event photos instantly to guests using real-time facial recognition technology.',
    tags: ['AI / ML', 'SaaS', 'Facial Recognition', 'Event Tech'],
    color: 'sky',
    bigPortfolio: true,
    tagline: 'Instant AI Photo Delivery for Events using Facial Recognition',
    icon: <img src={snapshareLogo} alt="SnapShare AI" />,
  },
  {
    name: 'ZilCubator',
    role: 'Director & Secretary',
    desc: 'Steering leadership and operational strategy inside a premium startup incubator designed to scale high-potential ideas.',
    tags: ['Incubation', 'Leadership'],
    color: 'blue',
    icon: <img src={zilcubatorLogo} alt="ZilCubator" />,
  },
  {
    name: 'Blulines',
    role: 'Growth Support',
    desc: 'Actively shaping strategic direction and hands-on operational architecture to unlock early growth and traction.',
    tags: ['Startup', 'Growth'],
    color: 'teal',
    icon: <img src={blulinesLogo} alt="Blulines" />,
  },
  {
    name: 'FitMyJob',
    role: 'Startup Involvement',
    desc: 'Advising on strategic market positioning and helping the team navigate the zero-to-one phase of growth.',
    tags: ['HR Tech', 'Advisory'],
    color: 'amber',
    icon: <img src={fitmyjobLogo} alt="FitMyJob" />,
  },
  {
    name: 'Paywint',
    role: 'Growth Support',
    desc: 'Guiding operational design and business growth strategies for a disruptive early-stage fintech startup.',
    tags: ['Fintech', 'Operations'],
    color: 'rose',
    icon: <img src={paywintLogo} alt="Paywint" />,
  },
  {
    name: 'Pitmasters Café',
    role: 'Expansion Support',
    desc: 'Driving geographical expansion, physical location scaling, and entry strategies for a rapidly growing F&B brand.',
    tags: ['F&B', 'Expansion'],
    color: 'emerald',
    icon: <img src={pitmastersLogo} className="logo-full" alt="Pitmasters Café" />,
  },
  {
    name: 'Kerlytix',
    role: 'Operations & Growth Manager',
    desc: 'A venture operating group that designs custom execution frameworks to make business operations reliable, systematic, and ready to scale.',
    tags: ['Venture Operating', 'Systematization', 'Scale'],
    color: 'indigo',
    icon: <img src={kerlytixLogo} className="logo-full" alt="Kerlytix" />,
    url: 'https://www.kerlytix.com',
  },
  {
    name: 'TheCubStudio',
    role: 'Digital Transformation Partner',
    desc: 'The digital transformation powerhouse that translates Kerlytix operational designs into custom-engineered technology systems.',
    tags: ['Digital Tech', 'Transformation', 'Scale'],
    color: 'violet',
    icon: <img src={cubstudioLogo} className="logo-full" alt="TheCubStudio" />,
    url: 'https://thecubstudio.com',
  },
];

const COLLABS = [
  'Unifirmasia', 'Barbarians',
  'MOWS Coworks', 'MFC Ecosystem', 'KTX Ecosystem',
];

export default function Ventures() {
  const [headerRef, headerVisible] = useScrollReveal();
  const [lynqRef, lynqVisible] = useScrollReveal({ threshold: 0.15 });
  const [snapRef, snapVisible] = useScrollReveal({ threshold: 0.15 });
  const [collabRef, collabVisible] = useScrollReveal();

  const lynqSpot = VENTURES.find(v => v.name === 'LYNQ Capital');
  const snapShare = VENTURES.find(v => v.name === 'SnapShare AI');
  
  // Split grid items to arrange Kerlytix & TheCubStudio row between the LYNQ and SnapShare spotlights
  const row1Grid = [
    VENTURES.find(v => v.name === 'Kerlytix'),
    VENTURES.find(v => v.name === 'TheCubStudio')
  ];

  const remainingGrid = VENTURES.filter(
    v => !['LYNQ Capital', 'SnapShare AI', 'Kerlytix', 'TheCubStudio'].includes(v.name)
  );

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

        {/* 1. LYNQ Capital — Big Portfolio Spotlight */}
        <div
          className={`snapshare-spotlight reveal ${lynqVisible ? 'visible' : ''}`}
          ref={lynqRef}
          style={{ marginBottom: '40px' }}
        >
          <div className="snapshare-left">
            <div className="snapshare-badge lynq-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              Founder &amp; Operator
            </div>
            <h3 className="snapshare-name">LYNQ <em>Capital</em></h3>
            <p className="snapshare-role">{lynqSpot.role}</p>
            <p className="snapshare-tagline">
              Structured Support Systems for Founders<br />
              across <span className="snapshare-highlight">Strategy &amp; Capital Operations.</span>
            </p>
            <p className="snapshare-desc">{lynqSpot.desc}</p>
            <div className="snapshare-tags" style={{ marginBottom: '12px' }}>
              {lynqSpot.tags.map(t => <span key={t} className="snapshare-tag">{t}</span>)}
            </div>

            {/* Premium action redirect button */}
            <a
              href="https://www.lynq.capital"
              target="_blank"
              rel="noopener noreferrer"
              className="ventures-redirect-btn"
            >
              <span>Visit Website</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="btn-arrow">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
          </div>
          <div className="snapshare-right">
            <div className="snapshare-card lynq-card">
              <div className="snapshare-card-glow" />
              
              {/* Erupting/Fountain Dollar Signs (Come Out model) */}
              <span className="erupting-dollar" style={{ '--angle': '0deg', '--delay': '0s' }}>$</span>
              <span className="erupting-dollar" style={{ '--angle': '45deg', '--delay': '0.4s' }}>$</span>
              <span className="erupting-dollar" style={{ '--angle': '90deg', '--delay': '0.2s' }}>$</span>
              <span className="erupting-dollar" style={{ '--angle': '135deg', '--delay': '0.6s' }}>$</span>
              <span className="erupting-dollar" style={{ '--angle': '180deg', '--delay': '0.1s' }}>$</span>
              <span className="erupting-dollar" style={{ '--angle': '225deg', '--delay': '0.5s' }}>$</span>
              <span className="erupting-dollar" style={{ '--angle': '270deg', '--delay': '0.3s' }}>$</span>
              <span className="erupting-dollar" style={{ '--angle': '315deg', '--delay': '0.7s' }}>$</span>

              <div className="snapshare-icon-ring lynq-icon-ring">
                <img src={lynqLogo} className="lynq-featured-logo" alt="LYNQ Capital" />
              </div>
              <div className="snapshare-card-label">LYNQ Capital</div>
              <div className="lynq-vault-corners">
                <div className="vault-corner tl" />
                <div className="vault-corner tr" />
                <div className="vault-corner bl" />
                <div className="vault-corner br" />
                <div className="lynq-pulse-ring" />
              </div>
            </div>
          </div>
        </div>

        {/* 2 & 3. Kerlytix and TheCubStudio — Top row of Card Grid */}
        <div className="ventures-grid-2col" style={{ marginBottom: '40px' }}>
          {row1Grid.map((v, i) => (
            <VentureCard key={v.name} venture={v} index={i} />
          ))}
        </div>

        {/* 4. SnapShare AI — Big Portfolio Spotlight */}
        <div
          className={`snapshare-spotlight reveal ${snapVisible ? 'visible' : ''}`}
          ref={snapRef}
          style={{ marginBottom: '40px' }}
        >
          <div className="snapshare-left">
            <div className="snapshare-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              Big Portfolio
            </div>
            <h3 className="snapshare-name">SnapShare <em>Ai</em></h3>
            <p className="snapshare-role">{snapShare.role}</p>
            <p className="snapshare-tagline">
              Instant AI Photo Delivery for Events<br />
              and Photographers using{' '}
              <span className="snapshare-highlight">Ai facial Recognition.</span>
            </p>
            <p className="snapshare-desc">{snapShare.desc}</p>
            <div className="snapshare-tags" style={{ marginBottom: '12px' }}>
              {snapShare.tags.map(t => <span key={t} className="snapshare-tag">{t}</span>)}
            </div>

            {/* Premium action redirect button */}
            <a
              href="https://www.snapshare.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="ventures-redirect-btn"
            >
              <span>Visit Website</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="btn-arrow">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
          </div>
          <div className="snapshare-right">
            <div className="snapshare-card">
              <div className="snapshare-card-glow" />
              <div className="snapshare-icon-ring">
                <img src={snapshareLogo} className="snapshare-featured-logo" alt="SnapShare AI" />
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

        {/* 5+. Remaining grid cards */}
        <div className="ventures-grid">
          {remainingGrid.map((v, i) => (
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
  const { name, role, desc, tags, color, icon, featured, url } = venture;

  const CardWrapper = url ? 'a' : 'div';
  const wrapperProps = url 
    ? { href: url, target: '_blank', rel: 'noopener noreferrer', style: { cursor: 'pointer', display: 'flex', flexDirection: 'column' } } 
    : {};

  return (
    <CardWrapper
      ref={ref}
      className={`venture-card reveal reveal-delay-${Math.min(index + 1, 5)} ${featured ? 'featured' : ''} ${visible ? 'visible' : ''} ${url ? 'clickable-card' : ''}`}
      {...wrapperProps}
    >
      {url && (
        <div className="card-external-arrow">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </div>
      )}
      <div className={`venture-icon ${color}`}>{icon}</div>
      <div className="venture-card-content">
        <h3>{name}</h3>
        <p className="venture-role">{role}</p>
        <p className="venture-desc">{desc}</p>
        
        {url && (
          <div className="venture-visit-btn">
            <span>Visit Website</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="btn-arrow">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </div>
        )}

        <div className="venture-tags">
          {tags.map((t) => <span key={t}>{t}</span>)}
        </div>
      </div>
    </CardWrapper>
  );
}
