import { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks';
import './MentoringGallery.css';

const EVENTS_DATA = [
  {
    id: 'asap',
    tag: 'ASAP Kerala',
    title: 'Skill Development &',
    titleGradient: 'Mentorship',
    desc: 'Empowering students across skill development initiatives as a strategic mentor for Additional Skill Acquisition Programme (ASAP) Kerala—shaping zero-to-one career roadmaps.',
    name: 'Additional Skill Acquisition Programme (ASAP) Kerala',
    location: 'Government Skill Centres, Kerala',
    date: '2024 - 2025',
    images: [
      '/gallery/mentoring1.jpg',
      '/gallery/mentoring2.jpg',
    ],
    color: 'rgba(168, 85, 247, 0.3)',
  },
  {
    id: 'lead',
    tag: 'LEAD College',
    title: 'Executive Classes &',
    titleGradient: 'Interactive Learning',
    desc: 'Leading active classes, interactive incubation bootcamps, and ecosystem workshops at LEAD College of Management—bridging theoretical study with practical market execution.',
    name: 'Incubation Workshop & Class Leadership',
    location: 'LEAD College of Management, Palakkad',
    date: '2024 - 2025',
    images: [
      '/gallery/mentoring3.jpg',
      '/gallery/mentoring4.jpg',
    ],
    color: 'rgba(16, 185, 129, 0.3)',
  },
];

export default function MentoringGallery() {
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

  return (
    <section className="mentoring-section" id="mentoring" ref={ref}>
      <div className="container">
        {/* Main Section Header */}
        <div className={`mentoring-section-header reveal ${visible ? 'visible' : ''}`}>
          <span className="section-tag-main">Academic & Professional Mentorship</span>
          <h2 className="section-title-main">
            Mentorship & <span className="text-gradient">Classroom Leadership</span>
          </h2>
          <p className="section-desc-main">
            Bridging theoretical study with practical market execution — leading workshops, incubation bootcamps, and executive sessions for the next generation of founders.
          </p>
        </div>

        <div className={`mentoring-inner reveal ${visible ? 'visible' : ''}`}>
          
          <div className="mentoring-header-wrapper">
            {/* Elegant high-tech background network dashed lines */}
            <div className="mentoring-header-decor">
              <div className="decor-line-mentoring decor-line-mentoring-1"></div>
              <div className="decor-line-mentoring decor-line-mentoring-2"></div>
            </div>

            {/* Key attribute triggers fresh enter animation for text on index switch */}
            <div className="mentoring-text" key={activeEventIndex}>
              <span className="section-tag mentoring-tag">{activeEvent.tag}</span>
              <h2 className="section-title mentoring-title">
                {activeEvent.title} <br/>
                <span className="text-gradient mentoring-gradient">{activeEvent.titleGradient}</span>
              </h2>
              <p className="section-desc mentoring-desc">{activeEvent.desc}</p>
            </div>
          </div>
          
          <div className="mentoring-showcase-wrapper">
            {/* Outer Switch Navigation Circular Buttons (Left / Right) */}
            <button onClick={handlePrevEvent} className="mentoring-outer-arrow-btn prev" aria-label="Previous Showcase">
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
                  className={`mentoring-deck-card ${positionClass}`}
                  onClick={() => {
                    if (!isActive) {
                      setActiveEventIndex(index);
                    }
                  }}
                >
                  <div className="mentoring-video-container" style={{ borderColor: event.color }}>
                    {event.images.map((img, idx) => (
                      <img
                        key={img}
                        src={img}
                        alt={`${event.tag} Highlight`}
                        className={`mentoring-image ${idx === (isActive ? currentIndex : 0) ? 'active' : ''}`}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ))}

                    {/* Event Name, Location, and Date Metadata Overlay */}
                    <div className="mentoring-meta-overlay">
                      <div className="mentoring-meta-title">{event.name}</div>
                      <div className="mentoring-meta-details">
                        <span>{event.location}</span>
                        <span className="mentoring-meta-dot" />
                        <span>{event.date}</span>
                      </div>
                    </div>

                    <div className="mentoring-overlay">
                      <span className="mentoring-indicator">Live Preview</span>
                    </div>

                    {/* Premium Glass Teaser Overlay for the Inactive/Side card */}
                    {!isActive && (
                      <div className="mentoring-teaser-overlay">
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

            <button onClick={handleNextEvent} className="mentoring-outer-arrow-btn next" aria-label="Next Showcase">
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
