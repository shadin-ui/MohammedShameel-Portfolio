import { useState } from 'react';
import { useScrollReveal } from '../hooks';
import './Gallery.css';

const GALLERY_ITEMS = [
  {
    id: 1,
    num: '01',
    title: 'Expand North Star Dubai',
    location: 'Dubai, UAE',
    tag: 'Global Startup Summit',
    image: '/gallery/event4.jpg',
    gradient: 'linear-gradient(135deg, #0a1628 0%, #f97316 50%, #0a1628 100%)',
    color: '#f97316',
  },
  {
    id: 2,
    num: '02',
    title: 'GITEX 2025 — Dubai Chamber Digital',
    location: 'Dubai, UAE',
    tag: 'GITEX 2025',
    image: '/gallery/event5.jpg',
    gradient: 'linear-gradient(135deg, #00103a 0%, #007AFF 50%, #00103a 100%)',
    color: '#007AFF',
  },
  {
    id: 3,
    num: '03',
    title: 'GITEX Global 2025',
    location: 'Dubai, UAE',
    tag: 'GITEX 2025',
    image: '/gallery/gitex2025.jpg',
    gradient: 'linear-gradient(135deg, #10002b 0%, #7b2cbf 50%, #10002b 100%)',
    color: '#7b2cbf',
  },
  {
    id: 4,
    num: '04',
    title: 'With Governor Phil Murphy',
    location: 'New Jersey, USA',
    tag: 'Leadership Connect',
    image: '/gallery/event2.jpg',
    gradient: 'linear-gradient(135deg, #1a0a00 0%, #dc2626 50%, #1a0a00 100%)',
    color: '#dc2626',
  },
  {
    id: 5,
    num: '05',
    title: 'Tech & Startup Networking',
    location: 'Kerala, India',
    tag: 'Ecosystem Event',
    image: '/gallery/event1.jpg',
    gradient: 'linear-gradient(135deg, #001a0d 0%, #10b981 50%, #001a0d 100%)',
    color: '#10b981',
  },
  {
    id: 6,
    num: '06',
    title: 'MFC Meetup',
    location: 'Kerala, India',
    tag: 'Community Building',
    image: '/gallery/event3.jpg',
    gradient: 'linear-gradient(135deg, #1a0533 0%, #8B2FC0 50%, #1a0533 100%)',
    color: 'rgba(58, 180, 109, 1)',
  },
];

export default function Gallery() {
  const [active, setActive] = useState(0);
  const [headerRef, headerVisible] = useScrollReveal();

  return (
    <section className="gallery-section" id="gallery">
      <div className="container">
        <div
          className={`gallery-header reveal ${headerVisible ? 'visible' : ''}`}
          ref={headerRef}
        >
          <span className="section-tag">Moments &amp; Milestones</span>
          <h2>
            Events I've <span className="text-gradient">Attended &amp; Led</span>
          </h2>
          <p className="gallery-sub">
            From global tech summits to grassroots founder meets — building presence across every room that matters.
          </p>
        </div>

        <div className="gallery-accordion">
          {GALLERY_ITEMS.map((item, i) => (
            <div
              key={item.id}
              className={`gallery-panel ${active === i ? 'is-active' : ''}`}
              onClick={() => setActive(i)}
              style={{ '--panel-color': item.color, '--panel-gradient': item.gradient }}
            >
              {/* Number + Arrow Header */}
              <div className="panel-header">
                <div className="panel-arrow">
                  {active === i ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 7L7 17M17 17V7H7" />
                    </svg>
                  )}
                </div>
                <span className="panel-num">{item.num}</span>
              </div>

              {/* Image / Gradient background */}
              <div className="panel-image-wrap" style={{ background: item.gradient }}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="panel-image"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div className="panel-image-overlay" />
              </div>

              {/* Footer info at bottom of expanded panel */}
              <div className="panel-footer">
                <span className="panel-tag">{item.tag}</span>
                <h3 className="panel-title">{item.title}</h3>
                <p className="panel-location">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {item.location}
                </p>
              </div>

              {/* Collapsed label */}
              <div className="panel-collapsed-label">
                <span className="collapsed-tag">{item.tag}</span>
                <span className="collapsed-title">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

