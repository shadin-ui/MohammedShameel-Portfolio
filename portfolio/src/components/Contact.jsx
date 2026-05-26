import { useState } from 'react';
import { useScrollReveal } from '../hooks';
import './Contact.css';

const MARQUEE_ITEMS = [
  'Ecosystem Builder', '◆', 'Venture Operator', '◆', '39+ Startups', '◆',
  '₹22Cr+ Exposure', '◆', 'LYNQ Capital', '◆', 'Strategic Partnerships', '◆',
];

export default function Contact() {
  const [leftRef, leftVisible] = useScrollReveal();
  const [rightRef, rightVisible] = useScrollReveal();
  const [activeTab, setActiveTab] = useState('startup'); // 'startup' or 'investor'
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
                  href="https://www.instagram.com/lynqcapital"
                  label="Instagram"
                  handle="@lynqcapital"
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                    </svg>
                  }
                />
                <ContactLink
                  href="mailto:hello@lynqcapital.com"
                  label="Email"
                  handle="hello@lynqcapital.com"
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
                </div>

                {submitted ? (
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
                          <select
                            id="form-stage"
                            name="stage"
                            value={formData.stage}
                            onChange={handleInputChange}
                          >
                            <option value="idea">Idea / Pre-Seed</option>
                            <option value="seed">Seed Stage</option>
                            <option value="growth">Series A / Growth</option>
                            <option value="bootstrap">Bootstrapped / Profitable</option>
                          </select>
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
                            <select
                              id="form-ticket"
                              name="ticketSize"
                              value={formData.ticketSize}
                              onChange={handleInputChange}
                            >
                              <option value="under50k">&lt; ₹50 Lakhs</option>
                              <option value="50k-250k">₹50 Lakhs - ₹2 Crores</option>
                              <option value="250k-1m">₹2 Crores - ₹5 Crores</option>
                              <option value="1m-plus">₹5 Crores +</option>
                            </select>
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
                <div className="footer-logo-mark">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <div className="footer-brand-text">
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
                <a href="https://www.instagram.com/lynqcapital" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="mailto:hello@lynqcapital.com">Email</a>
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
                <a href="https://www.instagram.com/lynqcapital" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                </a>
                <a href="mailto:hello@lynqcapital.com" aria-label="Email">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </a>
              </div>
              <button
                className="footer-scroll-up-btn"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Scroll to top"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5" />
                  <polyline points="5 12 12 5 19 12" />
                </svg>
              </button>
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

