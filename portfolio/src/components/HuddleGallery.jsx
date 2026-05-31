import { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks';
import './HuddleGallery.css';

const EVENTS_DATA = [
  {
    id: 'huddle',
    tag: 'Huddle Global 2025',
    title: 'Startup & Ecosystem',
    titleGradient: 'Highlights',
    desc: 'Celebrating 3 years of continuous ecosystem presence at Huddle Global — building relationships, engaging with founders, and scaling ventures at one of the region\'s premier technology summits.',
    name: 'Huddle Global 2025',
    location: 'Thiruvananthapuram, Kerala',
    date: 'Feb 2025',
    images: [
      '/gallery/huddle1.jpg',
      '/gallery/huddle2.jpg',
      '/gallery/huddle3.jpg',
      '/gallery/huddle4.jpg',
      '/gallery/huddle5.jpg',
      '/gallery/huddle6.jpg',
      '/gallery/huddle7.jpg',
      '/gallery/huddle8.jpg',
      '/gallery/huddle9.jpg',
      '/gallery/huddle10.jpg',
    ],
    color: 'rgba(82, 3, 128, 0.3)',
  },
  {
    id: 'mfc',
    tag: 'Malappuram FC',
    title: 'Sports & Community',
    titleGradient: 'Operations',
    desc: 'Serving as the Start Co-Ordinator for Malappuram FC (MFC) — managing operational coordination, ecosystem integration, and public engagement for community-driven sports ventures.',
    name: 'Malappuram FC Match Coordination',
    location: 'Malappuram Stadium, Kerala',
    date: 'Jan 2025',
    images: [
      '/gallery/mfc1.jpg',
      '/gallery/mfc2.jpg',
      '/gallery/mfc3.jpg',
      '/gallery/mfc4.jpg',
      '/gallery/mfc5.jpg',
    ],
    color: 'rgba(239, 68, 68, 0.2)', // red accent for sports/MFC
  },
];

export default function HuddleGallery() {
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, visible] = useScrollReveal({ threshold: 0.15 });

  const activeEvent = EVENTS_DATA[activeEventIndex];

  // Auto-play interval for cycling images within the active event
  useEffect(() => {
    setCurrentIndex(0);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeEvent.images.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [activeEventIndex, activeEvent.images.length]);

  // Force Lenis / Scroll height recalculation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleNextEvent = () => {
    setActiveEventIndex((prev) => (prev + 1) % EVENTS_DATA.length);
  };

  const handlePrevEvent = () => {
    setActiveEventIndex((prev) => (prev - 1 + EVENTS_DATA.length) % EVENTS_DATA.length);
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % activeEvent.images.length);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + activeEvent.images.length) % activeEvent.images.length);
  };

  const prevEventInfo = EVENTS_DATA[(activeEventIndex - 1 + EVENTS_DATA.length) % EVENTS_DATA.length];
  const nextEventInfo = EVENTS_DATA[(activeEventIndex + 1) % EVENTS_DATA.length];

  return (
    <section className="huddle-section" id="huddle" ref={ref}>
      <div className="container">
        {/* Main Section Header */}
        <div className={`huddle-section-header reveal ${visible ? 'visible' : ''}`}>
          <span className="section-tag-main">Ecosystem & Community</span>
          <h2 className="section-title-main">
            Ecosystem <span className="text-gradient">Involvement & Operations</span>
          </h2>
          <p className="section-desc-main">
            Driving startup growth, operational scaling, and community integration across regional technology summits and sports ventures.
          </p>
        </div>

        <div className={`huddle-inner reveal ${visible ? 'visible' : ''}`}>
          
          <div className="huddle-header-wrapper">
            {/* Elegant high-tech background network dashed lines */}
            <div className="huddle-header-decor">
              <div className="decor-line decor-line-1"></div>
              <div className="decor-line decor-line-2"></div>
            </div>

            {/* Key attribute triggers fresh enter animation for text on index switch */}
            <div className="huddle-text" key={activeEventIndex}>
              <span className="section-tag huddle-tag">{activeEvent.tag}</span>
              <h2 className="section-title huddle-title">
                {activeEvent.title} <br/>
                <span className="text-gradient huddle-gradient">{activeEvent.titleGradient}</span>
              </h2>
              <p className="section-desc huddle-desc">{activeEvent.desc}</p>
            </div>
          </div>
          
          <div className="huddle-showcase-wrapper">
            {/* Outer Switch Navigation Circular Buttons (Left / Right) */}
            <button onClick={handlePrevEvent} className="huddle-outer-arrow-btn prev" aria-label="Previous Showcase">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            {EVENTS_DATA.map((event, index) => {
              const isActive = index === activeEventIndex;
              const positionClass = isActive 
                ? 'active' 
                : (index > activeEventIndex ? 'next' : 'prev');

              return (
                <div 
                  key={event.id}
                  className={`huddle-deck-card ${positionClass}`}
                  onClick={() => {
                    if (!isActive) {
                      setActiveEventIndex(index);
                    }
                  }}
                >
                  <div className="huddle-video-container" style={{ borderColor: event.color }}>
                    {event.images.map((img, idx) => (
                      <img
                        key={img}
                        src={img}
                        alt={`${event.tag} Highlight`}
                        className={`huddle-image ${idx === (isActive ? currentIndex : 0) ? 'active' : ''}`}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ))}
                    


                    {/* Event Name, Location, and Date Metadata Overlay */}
                    <div className="huddle-meta-overlay">
                      <div className="huddle-meta-title">{event.name}</div>
                      <div className="huddle-meta-details">
                        <span>{event.location}</span>
                        <span className="huddle-meta-dot" />
                        <span>{event.date}</span>
                      </div>
                    </div>

                    <div className="huddle-overlay">
                      <span className="huddle-indicator">Live Preview</span>
                    </div>

                    {/* Premium Glass Teaser Overlay for the Inactive/Side card */}
                    {!isActive && (
                      <div className="huddle-teaser-overlay">
                        <span className="teaser-tag">{event.tag}</span>
                        <div className="teaser-pill">
                          <span>Next Showcase</span>
                          <svg className="teaser-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            <button onClick={handleNextEvent} className="huddle-outer-arrow-btn next" aria-label="Next Showcase">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
