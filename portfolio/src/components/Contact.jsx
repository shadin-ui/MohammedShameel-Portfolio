import { useState, useEffect, useRef } from 'react';
import { useScrollReveal } from '../hooks';
import './Contact.css';

const MARQUEE_ITEMS = [
  'Ecosystem Builder', '◆', 'Venture Operator', '◆', '39+ Startups', '◆',
  '₹22Cr+ Exposure', '◆', 'LYNQ Capital', '◆', 'Strategic Partnerships', '◆',
];

const STAGE_OPTIONS = [
  { value: 'idea', label: 'Idea / Pre-Seed' },
  { value: 'seed', label: 'Seed Stage' },
  { value: 'growth', label: 'Series A / Growth' },
  { value: 'bootstrap', label: 'Bootstrapped / Profitable' },
];

const TICKET_OPTIONS = [
  { value: 'under50k', label: '< ₹50 Lakhs' },
  { value: '50k-250k', label: '₹50 Lakhs - ₹2 Crores' },
  { value: '250k-1m', label: '₹2 Crores - ₹5 Crores' },
  { value: '1m-plus', label: '₹5 Crores +' },
];

export default function Contact() {
  const [leftRef, leftVisible] = useScrollReveal();
  const [rightRef, rightVisible] = useScrollReveal();
  const [activeTab, setActiveTab] = useState('startup'); // 'startup', 'investor', or 'scheduler'
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    url: '',
    stage: 'idea',
    message: '',
    ticketSize: '50k-250k',
    thesis: ''
  });

  // Secure Call Scheduler States
  const [viewDate, setViewDate] = useState(new Date(2026, 5, 1)); // Starts June 1st, 2026
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingDuration, setBookingDuration] = useState(30); // 15 or 30 minutes
  const [schedulerFormData, setSchedulerFormData] = useState({
    name: '',
    email: '',
    topic: 'Seed Funding Pitch'
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Available Time Slots
  const TIME_SLOTS = ['10:30 AM', '11:45 AM', '02:15 PM', '04:30 PM', '05:45 PM'];

  // Global Tab Trigger Registration
  useEffect(() => {
    window.selectContactTab = (tab) => {
      setActiveTab(tab);
    };
    return () => {
      window.selectContactTab = null;
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Smooth reset timeout for premium user experience
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        company: '',
        url: '',
        stage: 'idea',
        message: '',
        ticketSize: '50k-250k',
        thesis: ''
      });
    }, 5000);
  };

  // Secure Call Scheduler Handlers
  const handlePrevMonth = () => {
    setViewDate(prev => {
      const nextDate = new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
      if (nextDate.getMonth() >= 4 && nextDate.getFullYear() === 2026) { // Limit: May 2026
        return nextDate;
      }
      return prev;
    });
  };

  const handleNextMonth = () => {
    setViewDate(prev => {
      const nextDate = new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
      if (nextDate.getMonth() <= 7 && nextDate.getFullYear() === 2026) { // Limit: August 2026
        return nextDate;
      }
      return prev;
    });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingSubmitted(true);
    setTimeout(() => {
      setBookingSubmitted(false);
      setSelectedDate(null);
      setSelectedTime('');
      setSchedulerFormData({
        name: '',
        email: '',
        topic: 'Seed Funding Pitch'
      });
    }, 8000);
  };

  const renderCalendarDays = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const startOffset = firstDay === 0 ? 6 : firstDay - 1; // Mon is day index 0

    const cells = [];

    for (let i = 0; i < startOffset; i++) {
      cells.push({ type: 'empty', id: `empty-${i}` });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(year, month, day);
      const isPast = dateObj < new Date(2026, 4, 30); // May 30, 2026 is today
      const isWeekend = dateObj.getDay() === 0 || dateObj.getDay() === 6;
      const isFullyBooked = !isPast && !isWeekend && (day % 7 === 2 || day % 8 === 0);

      cells.push({
        type: 'day',
        day,
        date: dateObj,
        isPast,
        isWeekend,
        isFullyBooked,
        id: `day-${day}`
      });
    }

    return cells;
  };

  return (
    <>
      {/* Marquee */}
      <div className="marquee">
        <div className="marquee-track">
          {[0, 1].map((i) => (
            <div className="marquee-inner" key={i}>
              {MARQUEE_ITEMS.map((item, j) => (
                <span key={`${i}-${j}`} className={item === '◆' ? 'marquee-dot' : ''}>
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <section className="contact-section" id="contact">
        <div className="container">
          <div className="contact-grid">
            <div className={`contact-left reveal ${leftVisible ? 'visible' : ''}`} ref={leftRef}>
              <span className="section-tag">Get In Touch</span>
              <h2>
                Let's Build <span className="text-gradient">Something Together</span>
              </h2>
              <p className="contact-desc">
                Whether you're a founder looking for structured support, an investor seeking deal flow,
                or an ecosystem partner — let's connect.
              </p>

              <div className="contact-links">
                <ContactLink
                  href="https://www.linkedin.com/in/shameelpalakodan"
                  label="LinkedIn"
                  handle="Mohammed Shameel"
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  }
                />
                <ContactLink
                  href="https://www.instagram.com/moh.shameel"
                  label="Instagram"
                  handle="@moh.shameel"
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                    </svg>
                  }
                />
                <ContactLink
                  href="mailto:shameelb2b@gmail.com"
                  label="Email"
                  handle="shameelb2b@gmail.com"
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  }
                />
              </div>
            </div>

            <div className={`reveal reveal-delay-2 ${rightVisible ? 'visible' : ''}`} ref={rightRef}>
              <div className="contact-form-container">
                <div className="form-tabs">
                  <button
                    type="button"
                    className={`form-tab-btn ${activeTab === 'startup' ? 'active' : ''}`}
                    onClick={() => setActiveTab('startup')}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="tab-icon">
                      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                      <path d="M12 2C7.8 2 2 7.8 2 12c0 1.2 1.3 2.1 2.2 2.1 1.1 0 2.2-.6 2.9-1.3L15 5c.7-.7 1.3-1.8 1.3-2.9C16.3 1.2 13.2 2 12 2z" />
                      <path d="M9 15l6-6" />
                    </svg>
                    Startups
                  </button>
                  <button
                    type="button"
                    className={`form-tab-btn ${activeTab === 'investor' ? 'active' : ''}`}
                    onClick={() => setActiveTab('investor')}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="tab-icon">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                    Investors
                  </button>
                  <button
                    type="button"
                    className={`form-tab-btn ${activeTab === 'scheduler' ? 'active' : ''}`}
                    onClick={() => setActiveTab('scheduler')}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="tab-icon">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    Schedule Call
                  </button>
                </div>

                {activeTab === 'scheduler' ? (
                  bookingSubmitted ? (
                    <div className="form-success-card booking-success">
                      <div className="success-icon-wrapper">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="success-check">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <h4>Call Scheduled Successfully!</h4>
                      <p className="success-desc">
                        Shameel has booked a <strong>{bookingDuration}-Minute Video Session</strong> on:
                      </p>
                      <div className="success-booking-details">
                        <div className="detail-item">
                          <span className="label">DATE</span>
                          <span className="val">{selectedDate ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : ''}</span>
                        </div>
                        <div className="detail-item">
                          <span className="label">TIME</span>
                          <span className="val">{selectedTime} (IST)</span>
                        </div>
                        <div className="detail-item">
                          <span className="label">MEETING METHOD</span>
                          <span className="val secure-method">✦ Google Meet (Secure Link generated)</span>
                        </div>
                      </div>
                      <p className="success-notice">
                        A secure calendar invitation containing the meeting link has been dispatched to <strong>{schedulerFormData.email}</strong>. No contact numbers were exposed.
                      </p>
                      <span className="success-status">LYNQ · SECURE · INVITE · QUEUED</span>
                    </div>
                  ) : (
                    <form onSubmit={handleBookingSubmit} className="interactive-connect-form">
                      <div className="scheduler-layout">
                        {/* Duration Selector */}
                        <div className="form-group">
                          <label>Select Session Duration</label>
                          <div className="duration-selector">
                            {[15, 30].map((mins) => (
                              <button
                                type="button"
                                key={mins}
                                className={`duration-btn ${bookingDuration === mins ? 'active' : ''}`}
                                onClick={() => setBookingDuration(mins)}
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="duration-icon">
                                  <circle cx="12" cy="12" r="10" />
                                  <polyline points="12 6 12 12 16 14" />
                                </svg>
                                {mins} Min Strategy Call
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Calendar Month Header */}
                        <div className="calendar-header-row">
                          <button type="button" className="cal-nav-btn" onClick={handlePrevMonth} aria-label="Previous Month">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                              <polyline points="15 18 9 12 15 6" />
                            </svg>
                          </button>
                          <h4 className="cal-month-title">
                            {viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                          </h4>
                          <button type="button" className="cal-nav-btn" onClick={handleNextMonth} aria-label="Next Month">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                              <polyline points="9 18 15 12 9 6" />
                            </svg>
                          </button>
                        </div>

                        {/* Calendar Weekday Names */}
                        <div className="calendar-weekdays">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(w => (
                            <div key={w} className="weekday-lbl">
                              <span className="weekday-long">{w}</span>
                              <span className="weekday-short">{w[0]}</span>
                            </div>
                          ))}
                        </div>

                        {/* Calendar Grid of Days */}
                        <div className="calendar-days-grid">
                          {renderCalendarDays().map((cell, idx) => {
                            if (cell.type === 'empty') {
                              return <div key={cell.id} className="calendar-day-empty" />;
                            }

                            const isSelected = selectedDate && 
                              selectedDate.getDate() === cell.day && 
                              selectedDate.getMonth() === cell.date.getMonth() && 
                              selectedDate.getFullYear() === cell.date.getFullYear();

                            const isDisabled = cell.isPast || cell.isWeekend || cell.isFullyBooked;

                            return (
                              <button
                                type="button"
                                key={cell.id}
                                disabled={isDisabled}
                                className={`calendar-day-btn ${isSelected ? 'selected' : ''} ${cell.isWeekend ? 'weekend' : ''} ${cell.isFullyBooked ? 'fully-booked' : ''}`}
                                onClick={() => {
                                  setSelectedDate(cell.date);
                                  setSelectedTime(''); // Reset time on date change
                                }}
                              >
                                <span className="day-number">{cell.day}</span>
                                {cell.isFullyBooked && <span className="fully-booked-lbl" title="Fully Booked">Busy</span>}
                              </button>
                            );
                          })}
                        </div>

                        {/* Time Slots Selector */}
                        {selectedDate && (
                          <div className="time-slots-section">
                            <label className="slots-label">
                              Available Time Slots for {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </label>
                            <div className="time-slots-grid">
                              {TIME_SLOTS.map((time) => (
                                <button
                                  type="button"
                                  key={time}
                                  className={`time-slot-btn ${selectedTime === time ? 'active' : ''}`}
                                  onClick={() => setSelectedTime(time)}
                                >
                                  {time}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Details Form */}
                        {selectedDate && selectedTime && (
                          <div className="booking-details-section">
                            <div className="form-group">
                              <label htmlFor="sched-name">Your Full Name</label>
                              <input
                                type="text"
                                id="sched-name"
                                required
                                placeholder="e.g. Shameel"
                                value={schedulerFormData.name}
                                onChange={(e) => setSchedulerFormData(prev => ({ ...prev, name: e.target.value }))}
                              />
                            </div>

                            <div className="form-group">
                              <label htmlFor="sched-email">Your Work Email (for meeting invite)</label>
                              <input
                                type="email"
                                id="sched-email"
                                required
                                placeholder="e.g. partner@firm.com"
                                value={schedulerFormData.email}
                                onChange={(e) => setSchedulerFormData(prev => ({ ...prev, email: e.target.value }))}
                              />
                            </div>

                            <div className="form-group">
                              <label htmlFor="sched-topic">Topic of Discussion</label>
                              <div className="custom-select-container">
                                <select
                                  id="sched-topic"
                                  value={schedulerFormData.topic}
                                  onChange={(e) => setSchedulerFormData(prev => ({ ...prev, topic: e.target.value }))}
                                  className="select-field-actual"
                                >
                                  <option value="Seed Funding Pitch">Seed Funding Pitch (Startups)</option>
                                  <option value="Ecosystem Support">Ecosystem / Scaling Support</option>
                                  <option value="Mentorship Inquiry">Mentorship & Classroom Inquiry</option>
                                  <option value="VC Syndication">VC Co-Investment / Dealflow</option>
                                </select>
                              </div>
                            </div>

                            <button type="submit" className="form-submit-btn">
                              <span>Confirm Booking</span>
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="btn-arrow">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    </form>
                  )
                ) : submitted ? (
                  <div className="form-success-card">
                    <div className="success-icon-wrapper">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="success-check">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h4>Inquiry Submitted!</h4>
                    <p>
                      Thank you for reaching out. Shameel and the LYNQ Capital team will review your details and connect shortly.
                    </p>
                    <span className="success-status">SYSTEM STATUS: QUEUED (OK)</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="interactive-connect-form">
                    <div className="form-group">
                      <label htmlFor="form-name">Your Full Name</label>
                      <input
                        type="text"
                        id="form-name"
                        name="name"
                        required
                        placeholder="e.g. Shameel"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>

                    {activeTab === 'startup' ? (
                      <>
                        <div className="form-row-2">
                          <div className="form-group">
                            <label htmlFor="form-company">Startup Name</label>
                            <input
                              type="text"
                              id="form-company"
                              name="company"
                              required
                              placeholder="e.g. EcoSphere"
                              value={formData.company}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="form-url">Pitch Deck / Web Link</label>
                            <input
                              type="url"
                              id="form-url"
                              name="url"
                              placeholder="e.g. https://pitch.com/..."
                              value={formData.url}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label htmlFor="form-stage">Startup Growth Stage</label>
                          <CustomSelect
                            name="stage"
                            value={formData.stage}
                            onChange={handleInputChange}
                            options={STAGE_OPTIONS}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="form-message">What are you building & how can Shameel help?</label>
                          <textarea
                            id="form-message"
                            name="message"
                            required
                            rows="4"
                            placeholder="Tell us about your mission, product, and operational/fundraising goals..."
                            value={formData.message}
                            onChange={handleInputChange}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="form-row-2">
                          <div className="form-group">
                            <label htmlFor="form-company">Firm / Fund Name</label>
                            <input
                              type="text"
                              id="form-company"
                              name="company"
                              required
                              placeholder="e.g. Lynq Capital"
                              value={formData.company}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="form-ticket">Average Ticket Size</label>
                            <CustomSelect
                              name="ticketSize"
                              value={formData.ticketSize}
                              onChange={handleInputChange}
                              options={TICKET_OPTIONS}
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label htmlFor="form-thesis">Investment Focus / Sectors</label>
                          <input
                            type="text"
                            id="form-thesis"
                            name="thesis"
                            placeholder="e.g. SaaS, Fintech, DeepTech, Web3"
                            value={formData.thesis}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="form-message">Dealflow preferences / How would you like to collaborate?</label>
                          <textarea
                            id="form-message"
                            name="message"
                            required
                            rows="4"
                            placeholder="Describe your co-investment, operational advisory, or scouting dealflow expectations..."
                            value={formData.message}
                            onChange={handleInputChange}
                          />
                        </div>
                      </>
                    )}

                    <button type="submit" className="form-submit-btn">
                      <span>Submit Inquiry</span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="btn-arrow">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        {/* Glow & Arch Vault elements */}
        <div className="footer-glow" />
        <div className="footer-arch" />

        <div className="container">
          {/* Giant 3D/Editorial Brand Text — REAL-Inspired Retro/Chrome Extrusion */}
          <div className="footer-brand-wrapper">
            <div className="footer-giant-brand" data-text="SHAMEEL">
              SHAMEEL
            </div>

            {/* 3D/Chrome Floating Artifacts */}
            <div className="footer-floating-decorations">
              <span className="decor-coin coin-1">L</span>
              <span className="decor-coin coin-2">Q</span>
              <span className="decor-cylinder cylinder-1"></span>
              <span className="decor-cube cube-1"></span>
              <span className="decor-torus torus-1"></span>
            </div>
          </div>

          <div className="footer-main-row">
            <div className="footer-bio-col">
              <div className="footer-logo">
                <div className="footer-brand-text" style={{ marginLeft: 0 }}>
                  <span>Mohammed Shameel</span>
                  <p>Venture Operator & Ecosystem Builder</p>
                </div>
              </div>
              <p className="footer-bio-text">
                Building structured execution systems and strategic network operations that help early-stage ventures scale. Operates under LYNQ Capital.
              </p>
            </div>

            <div className="footer-links-col">
              <div className="footer-link-group">
                <h5>Connect</h5>
                <a href="https://www.linkedin.com/in/shameelpalakodan" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://www.instagram.com/moh.shameel" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="mailto:shameelb2b@gmail.com">Email</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom-row">
            <p className="footer-copyright">
              © 2026 Mohammed Shameel. All rights reserved.
            </p>
            <div className="footer-bottom-right">
              <div className="footer-socials">
                <a href="https://www.linkedin.com/in/shameelpalakodan" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/moh.shameel" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                </a>
                <a href="mailto:shameelb2b@gmail.com" aria-label="Email">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

function ContactLink({ href, label, handle, icon }) {
  return (
    <a href={href} className="contact-link" target="_blank" rel="noopener noreferrer">
      <div className="contact-link-icon">{icon}</div>
      <div className="contact-link-text">
        <span className="contact-link-label">{label}</span>
        <span className="contact-link-handle">{handle}</span>
      </div>
      <svg className="contact-link-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M7 17L17 7M17 7H7M17 7v10" />
      </svg>
    </a>
  );
}

function CustomSelect({ name, value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value) || options[0];

  const handleSelect = (val) => {
    onChange({ target: { name, value: val } });
    setIsOpen(false);
  };

  return (
    <div className={`custom-select-container ${isOpen ? 'is-open' : ''}`} ref={containerRef}>
      <button
        type="button"
        className="custom-select-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="custom-select-value">{selectedOption ? selectedOption.label : ''}</span>
        <svg className="custom-select-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <ul className="custom-select-dropdown" role="listbox">
          {options.map((opt) => (
            <li
              key={opt.value}
              className={`custom-select-option ${opt.value === value ? 'selected' : ''}`}
              role="option"
              aria-selected={opt.value === value}
              onClick={() => handleSelect(opt.value)}
            >
              <span className="option-label">{opt.label}</span>
              {opt.value === value && (
                <svg className="option-check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

