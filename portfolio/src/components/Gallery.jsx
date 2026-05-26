import { useState } from 'react';
import { useScrollReveal } from '../hooks';
import './Gallery.css';

const GALLERY_ITEMS = [
  {
    id: 1,
    num: '01',
    title: 'GITEX Global 2024',
    location: 'Dubai, UAE',
    tag: 'Global Tech Summit',
    image: '/gallery/gitex.jpg',
    gradient: 'linear-gradient(135deg, #1a0533 0%, #8B2FC0 50%, #1a0533 100%)',
    color: '#8B2FC0',
  },
  {
    id: 2,
    num: '02',
    title: 'Startup Kerala Summit',
    location: 'Kochi, Kerala',
    tag: 'Ecosystem Event',
    image: '/gallery/kerala-summit.jpg',
    gradient: 'linear-gradient(135deg, #001a0d 0%, #10b981 50%, #001a0d 100%)',
    color: '#10b981',
  },
  {
    id: 3,
    num: '03',
    title: 'LYNQ Capital Demo Day',
    location: 'Kozhikode, Kerala',
    tag: 'Investor Meetup',
    image: '/gallery/demo-day.jpg',
    gradient: 'linear-gradient(135deg, #001233 0%, #007AFF 50%, #001233 100%)',
    color: '#007AFF',
  },
  {
    id: 4,
    num: '04',
    title: 'Forbes Council Networking',
    location: 'Virtual · Global',
    tag: 'Strategic Meetup',
    image: '/gallery/forbes.jpg',
    gradient: 'linear-gradient(135deg, #1a1200 0%, #FFD700 50%, #1a1200 100%)',
    color: '#FFD700',
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

