import { useScrollReveal } from '../hooks';
import './Education.css';

const CERTS = [
  'Investment Banking Fundamentals',
  'Marketing & Business Strategy',
  'Finance & Startup Operations',
  'Technology Systems & Ecosystem Design',
];

const STEPS = [
  { title: 'Identify & Connect', desc: 'Map ecosystems to find high-potential founders and connect them with the right resources, mentors, and capital.' },
  { title: 'Structure & Design', desc: 'Build operational frameworks, execution systems, and growth strategies tailored to each venture\'s stage.' },
  { title: 'Activate & Scale', desc: 'Unlock network effects through partnerships, sponsorships, and ecosystem participation to accelerate growth.' },
  { title: 'Compound & Multiply', desc: 'Create portfolio-level synergies where success in one venture amplifies opportunities across the entire ecosystem.' },
];

export default function Education() {
  const [leftRef, leftVisible] = useScrollReveal();
  const [rightRef, rightVisible] = useScrollReveal();

  return (
    <section className="education" id="education">
      <div className="container">
        <div className="edu-grid">
          {/* Left Column */}
          <div className={`edu-col reveal ${leftVisible ? 'visible' : ''}`} ref={leftRef}>
            <span className="section-tag">Education & Foundation</span>
            <h2>
              Built on a <span className="text-gradient">Hybrid Foundation</span>
            </h2>

            <div className="edu-card">
              <div className="edu-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c0 1.1 2.7 2 6 2s6-.9 6-2v-5" />
                </svg>
              </div>
              <div className="edu-details">
                <h4>B.Tech in Computer Science & Engineering</h4>
                <p>APJ Abdul Kalam Technological University (KTU)</p>
                <span className="location">Keralam, India</span>
              </div>
            </div>

            <div>
              <h5 className="cert-heading">Certifications & Learning</h5>
              {CERTS.map((cert) => (
                <div className="cert-item" key={cert}>
                  <span className="cert-dot" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className={`edu-col reveal reveal-delay-2 ${rightVisible ? 'visible' : ''}`} ref={rightRef}>
            <span className="section-tag">The Approach</span>
            <h2>
              How The <span className="text-gradient">System Works</span>
            </h2>

            <div className="approach-steps">
              {STEPS.map((step, i) => (
                <div className="approach-step" key={step.title}>
                  <div className="step-marker">
                    <div className="step-circle">{i + 1}</div>
                    {i < STEPS.length - 1 && <div className="step-line" />}
                  </div>
                  <div className="step-body">
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
