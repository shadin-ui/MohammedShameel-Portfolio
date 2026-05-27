import { useScrollReveal } from '../hooks';
import './Gitex.css';

export default function Gitex() {
  const [ref, visible] = useScrollReveal({ threshold: 0.15 });

  return (
    <section className="gitex-section" id="gitex" ref={ref}>
      <div className="container">
        <div className={`gitex-inner reveal ${visible ? 'visible' : ''}`}>
          {/* Left — Label + Content */}
          <div className="gitex-left">
            <div className="gitex-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              Global Achievement
            </div>

            <h2 className="gitex-title">
              GITEX Global <em>2024 &amp; 2025</em>
            </h2>

            <p className="gitex-desc">
              Part of the organising ecosystem at GITEX Global 2025 after attending GITEX 2024 as a delegate and building relationships within the startup and technology ecosystem.
            </p>
            <p className="gitex-desc" style={{ marginTop: '16px' }}>
              Contributed across media, attendee engagement, partnerships, and strategic networking at one of the world’s largest technology exhibitions in Dubai — connecting with founders, investors, government representatives, and innovators across 80+ countries.
            </p>

            <div className="gitex-stats">
              <div className="gitex-stat">
                <span className="gitex-stat-num">180+</span>
                <span className="gitex-stat-label">Countries Represented</span>
              </div>
              <div className="gitex-stat-sep" />
              <div className="gitex-stat">
                <span className="gitex-stat-num">6,500+</span>
                <span className="gitex-stat-label">Exhibiting Companies</span>
              </div>
              <div className="gitex-stat-sep" />
              <div className="gitex-stat">
                <span className="gitex-stat-num">200K+</span>
                <span className="gitex-stat-label">Attendees</span>
              </div>
            </div>

            <div className="gitex-tags">
              {['Media & Reach', 'Global Networking', 'Investor Meetings', 'Government Relations', 'Ecosystem Advocacy'].map(tag => (
                <span key={tag} className="gitex-tag">{tag}</span>
              ))}
            </div>
          </div>

          {/* Right — Visual Card */}
          <div className="gitex-right">
            <div className="gitex-card">
              <div className="gitex-card-bg" />
              <div className="gitex-card-glow" />

              <div className="gitex-card-top">
                <span className="gitex-year">2024 - 2025</span>
                <span className="gitex-location">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Dubai, UAE
                </span>
              </div>

              <div className="gitex-card-logo-area">
                <div className="gitex-logo-ring">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <div className="gitex-card-name">GITEX<br />GLOBAL</div>
              </div>

              <div className="gitex-card-footer">
                <span className="gitex-card-label">World's Largest Tech Event</span>
                <div className="gitex-card-dots">
                  <span /><span /><span />
                </div>
              </div>
            </div>

            {/* Floating chips */}
            <div className="gitex-chip gitex-chip-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.73a16 16 0 0 0 5.8 5.8l1.82-1.82a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              Global Networks
            </div>
            <div className="gitex-chip gitex-chip-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>
              Media Coverage
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
